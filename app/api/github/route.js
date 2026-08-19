import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache 1 jam

// Helper: Bersihkan semua tag HTML, badge shields, markdown formatting, & URL
function sanitizeReadmeText(raw) {
  return raw
    // 1. Hapus tag komentar HTML <!-- ... -->
    .replace(/<!--[\s\S]*?-->/g, '')
    // 2. Hapus tag HTML pembuka, penutup, maupun self-closing (<img ... />, <p ...>, dsb)
    .replace(/<[^>]+>/g, ' ')
    // 3. Hapus blok kode ```code``` dan inline code `code`
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // 4. Hapus gambar format markdown ![alt](url)
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // 5. Hapus link badge (misal shields.io, travis, github badge)
    .replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    // 6. Hapus URL http/https mentah yang tersisa
    .replace(/https?:\/\/\S+/gi, '')
    // 7. Hapus markdown heading (#, ##, ###), blockquote (>), dan list bullet (*, -, +)
    .replace(/^#+\s+/gm, '')
    .replace(/^[>\*\-\+]\s+/gm, '')
    .replace(/[*_~=]/g, '')
    // 8. Normalisasi spasi dan baris baru
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper: Ambil kalimat pembuka proyek yang valid dari README
async function fetchReadmeSummary(username, repoName, defaultBranch = 'main') {
  const branches = [defaultBranch, 'master', 'main'];
  const uniqueBranches = Array.from(new Set(branches));

  for (const branch of uniqueBranches) {
    try {
      const url = `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/README.md`;
      const res = await fetch(url, { next: { revalidate: 86400 } });

      if (res.ok) {
        const text = await res.text();

        // Pecah per baris / blok paragraf
        const rawBlocks = text.split(/\n\s*\n/);

        for (const block of rawBlocks) {
          const cleaned = sanitizeReadmeText(block);

          // Kriteria kalimat deskripsi yang valid:
          // 1. Panjang minimal 35 karakter
          // 2. Tidak diawali kata metadata umum (seperti "Codename:", "Table of Contents", "License")
          // 3. Memiliki spasi/kata yang cukup (bukan sekadar 1 kata)
          const isMetadata = /^(codename:|license|table of contents|copyright|author:|version:)/i.test(cleaned);
          const hasEnoughWords = cleaned.split(' ').length >= 5;

          if (cleaned.length >= 35 && !isMetadata && hasEnoughWords) {
            return cleaned.length > 170 ? `${cleaned.slice(0, 170)}...` : cleaned;
          }
        }
      }
    } catch {
      // Lanjut ke branch berikutnya jika request gagal
    }
  }
  return null;
}

// Generator Fallback jika repo sama sekali tidak punya README / deskripsi
function generateFallbackDesc(repo) {
  const name = repo.name.toLowerCase();
  const lang = repo.language || 'Software';

  if (name.includes('bot') || name.includes('ai')) return `AI-powered intelligence system and automated assistant developed with ${lang}.`;
  if (name.includes('api') || name.includes('data')) return `High-throughput RESTful data service and modular API endpoints built using ${lang}.`;
  if (name.includes('app') || name.includes('mobile')) return `Cross-platform mobile application architecture with clean responsive UI written in ${lang}.`;
  if (name.includes('sec') || name.includes('guard') || name.includes('auth')) return `Security assessment and automated vulnerability monitoring suite engineered in ${lang}.`;
  if (name.includes('web') || name.includes('portal') || name.includes('landing')) return `Modern responsive web application and interactive system interface built with ${lang}.`;

  return `Modular production codebase and system architecture developed using ${lang}.`;
}

function inferCategory(repo) {
  const lang = (repo.language || '').toLowerCase();
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();

  if (lang === 'dart' || lang === 'flutter' || name.includes('mobile') || name.includes('app')) {
    return 'Mobile App';
  }
  if (name.includes('api') || name.includes('data') || name.includes('service') || name.includes('json')) {
    return 'API & Data';
  }
  if (
    lang === 'python' ||
    lang === 'shell' ||
    name.includes('bot') ||
    name.includes('tool') ||
    name.includes('script') ||
    desc.includes('security') ||
    desc.includes('audit')
  ) {
    return 'Tools & Security';
  }
  if (['php', 'blade', 'typescript', 'javascript', 'html', 'go', 'rust'].includes(lang)) {
    return 'Web Platform';
  }
  return 'Open Source';
}

export async function GET() {
  const username = 'ardifx01';
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'MNKDIGITAL-Showcase',
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }),
  };

  try {
    let allRepos = [];
    const maxPages = 4;

    for (let page = 1; page <= maxPages; page++) {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100&page=${page}&type=public`,
        { headers, next: { revalidate: 3600 } }
      );

      if (!res.ok) break;

      const pageRepos = await res.json();
      if (!Array.isArray(pageRepos) || pageRepos.length === 0) break;

      allRepos = allRepos.concat(pageRepos);
      if (pageRepos.length < 100) break;
    }

    const nonForkRepos = allRepos.filter((repo) => !repo.fork);

    // Proses deskripsi secara paralel
    const formatted = await Promise.all(
      nonForkRepos.map(async (repo, idx) => {
        let caption = repo.description;

        // Jika description bawaan GitHub kosong atau mengandung tag HTML mentah
        if (!caption || caption.trim() === '' || caption.includes('<')) {
          const readmeSnippet = await fetchReadmeSummary(username, repo.name, repo.default_branch);
          caption = readmeSnippet || generateFallbackDesc(repo);
        } else {
          // Bersihkan jika ada simbol aneh di deskripsi bawaan GitHub
          caption = sanitizeReadmeText(caption);
        }

        return {
          id: String(idx + 1).padStart(3, '0'),
          name: repo.name.replace(/[-_]/g, ' '),
          rawName: repo.name,
          category: inferCategory(repo),
          description: caption,
          language: repo.language || 'Codebase',
          topics: Array.isArray(repo.topics) && repo.topics.length > 0
            ? repo.topics
            : [repo.language?.toLowerCase() || 'dev'],
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          repoUrl: repo.html_url,
          homepage: repo.homepage || null,
          updatedAt: repo.pushed_at || repo.updated_at,
        };
      })
    );

    return NextResponse.json({
      success: true,
      total: formatted.length,
      projects: formatted,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
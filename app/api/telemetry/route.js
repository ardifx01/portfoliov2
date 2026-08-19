import { NextResponse } from 'next/server';

export const revalidate = 1800; // Cache 30 menit

const IGNORED_LANGS = ['text', 'other', 'markdown', 'json', 'yaml', 'xml', 'csv', 'log', 'ini', 'plain text'];

function filterAndNormalizeLanguages(languagesList) {
  if (!Array.isArray(languagesList)) return [];
  const validLangs = languagesList.filter((l) => {
    const nameLower = (l.name || '').toLowerCase();
    return !IGNORED_LANGS.includes(nameLower) && l.percent > 0.5;
  });
  const total = validLangs.reduce((acc, curr) => acc + curr.percent, 0);
  if (total === 0) return [];
  return validLangs.slice(0, 5).map((l) => ({
    name: l.name,
    percent: Number(((l.percent / total) * 100).toFixed(1)),
  }));
}

function calculateStreaks(days) {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Urutkan dari hari terlama ke terbaru
  const sortedDays = [...days].sort((a, b) => new Date(a.date) - new Date(b.date));

  for (const day of sortedDays) {
    if (day.contributionCount > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  // Cek streak aktif dari hari ini mundur ke belakang
  const reversed = [...sortedDays].reverse();
  for (let i = 0; i < reversed.length; i++) {
    if (reversed[i].contributionCount > 0) {
      currentStreak++;
    } else if (i === 0 && reversed[0].contributionCount === 0) {
      // Jika hari ini belum commit, beri toleransi cek kemarin
      continue;
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak };
}

export async function GET() {
  const GITHUB_USERNAME = 'ardifx01';
  const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  let githubStats = {
    username: GITHUB_USERNAME,
    publicRepos: 300,
    followers: 12,
    totalContributions: 540,
    currentStreak: 5,
    longestStreak: 21,
    recentDays: [],
  };

  // 1. Fetch GitHub via GraphQL untuk Kontribusi & Streak
  if (GITHUB_TOKEN) {
    try {
      const query = `
        query($username: String!) {
          user(login: $username) {
            followers { totalCount }
            repositories(privacy: PUBLIC) { totalCount }
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
          }
        }
      `;

      const ghRes = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'User-Agent': 'MNKDIGITAL-Telemetry',
        },
        body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
        next: { revalidate: 1800 },
      });

      if (ghRes.ok) {
        const ghJson = await ghRes.json();
        const user = ghJson?.data?.user;
        const calendar = user?.contributionsCollection?.contributionCalendar;

        if (calendar) {
          const allDays = calendar.weeks.flatMap((w) => w.contributionDays);
          const { currentStreak, longestStreak } = calculateStreaks(allDays);

          githubStats = {
            username: GITHUB_USERNAME,
            publicRepos: user.repositories.totalCount,
            followers: user.followers.totalCount,
            totalContributions: calendar.totalContributions,
            currentStreak,
            longestStreak,
            recentDays: allDays.slice(-28), // 4 minggu terakhir untuk mini chart
          };
        }
      }
    } catch (e) {
      console.error('GitHub GraphQL Error:', e);
    }
  }

  // 2. Fetch WakaTime Stats
  let wakaData = {
    totalHours: '142 hrs',
    dailyAverage: '4 hrs 45 mins',
    languages: [
      { name: 'Dart / Flutter', percent: 38.5 },
      { name: 'Python', percent: 28.2 },
      { name: 'PHP / Laravel', percent: 18.4 },
      { name: 'JavaScript', percent: 9.6 },
      { name: 'Go', percent: 5.3 },
    ],
  };

  if (WAKATIME_API_KEY) {
    try {
      const wakaRes = await fetch(
        `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${WAKATIME_API_KEY}`,
        { next: { revalidate: 1800 } }
      );
      if (wakaRes.ok) {
        const json = await wakaRes.json();
        if (json?.data) {
          const d = json.data;
          const cleaned = filterAndNormalizeLanguages(d.languages);
          wakaData = {
            totalHours: d.human_readable_total || '142 hrs',
            dailyAverage: d.human_readable_daily_average || '4 hrs',
            languages: cleaned.length ? cleaned : wakaData.languages,
          };
        }
      }
    } catch (e) {
      console.error('WakaTime Error:', e);
    }
  }

  return NextResponse.json({
    success: true,
    github: githubStats,
    wakatime: wakaData,
  });
}
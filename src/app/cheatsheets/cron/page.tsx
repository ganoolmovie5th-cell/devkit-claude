import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cron Expression Cheat Sheet — Quick Reference | DevKit',
  description: 'Complete cron expression cheat sheet with field descriptions, special characters, and common scheduling examples for Linux crontab.',
  alternates: { canonical: '/cheatsheets/cron/' },
  keywords: 'cron cheat sheet, crontab reference, cron expression examples',
}

const fields = [
  ['Field', 'Values', 'Special Characters'],
  ['Minute', '0-59', ', - * /'],
  ['Hour', '0-23', ', - * /'],
  ['Day of Month', '1-31', ', - * / ? L W'],
  ['Month', '1-12 or JAN-DEC', ', - * /'],
  ['Day of Week', '0-6 or SUN-SAT', ', - * / ? L #'],
]

const specials = [
  ['*', 'Any value (wildcard)'],
  [',', 'List separator (1,3,5)'],
  ['-', 'Range (1-5)'],
  ['/', 'Step values (*/5 = every 5)'],
  ['?', 'No specific value (day fields)'],
  ['L', 'Last day of month/week'],
  ['W', 'Nearest weekday to given day'],
  ['#', 'Nth day of week (2#1 = first Monday)'],
]

const examples = [
  ['* * * * *', 'Every minute'],
  ['0 * * * *', 'Every hour (at minute 0)'],
  ['0 0 * * *', 'Every day at midnight'],
  ['0 9 * * 1-5', 'Weekdays at 9:00 AM'],
  ['0 0 1 * *', 'First day of every month'],
  ['*/15 * * * *', 'Every 15 minutes'],
  ['0 6,18 * * *', 'At 6 AM and 6 PM'],
  ['0 0 * * 0', 'Every Sunday at midnight'],
  ['30 4 1,15 * *', '4:30 AM on 1st and 15th'],
  ['0 0 1 1 *', 'January 1st at midnight (yearly)'],
  ['0 */2 * * *', 'Every 2 hours'],
  ['0 9 * * 1', 'Every Monday at 9 AM'],
]

export default function CronCheatSheet() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cron Expression Cheat Sheet</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Quick reference for cron scheduling syntax. Build expressions with our <Link href="/tools/cron-expression-generator" className="text-blue-600 hover:underline">Cron Generator</Link>.</p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Format</h2>
          <pre className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm overflow-x-auto">
┌──────── minute (0-59){'\n'}│ ┌────── hour (0-23){'\n'}│ │ ┌──── day of month (1-31){'\n'}│ │ │ ┌── month (1-12){'\n'}│ │ │ │ ┌ day of week (0-6, Sun=0){'\n'}* * * * *</pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Fields</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  {fields[0].map((h, i) => <th key={i} className="py-2 pr-4 text-left text-gray-600 dark:text-gray-400 font-medium">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {fields.slice(1).map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 pr-4 font-medium text-gray-900 dark:text-white">{row[0]}</td>
                    <td className="py-2 pr-4 font-mono text-blue-600">{row[1]}</td>
                    <td className="py-2 font-mono text-gray-600 dark:text-gray-400">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Special Characters</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {specials.map(([char, desc], i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 pr-4 font-mono text-blue-600 font-bold w-16">{char}</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Examples</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {examples.map(([expr, desc], i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 pr-4 font-mono text-blue-600 whitespace-nowrap">{expr}</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

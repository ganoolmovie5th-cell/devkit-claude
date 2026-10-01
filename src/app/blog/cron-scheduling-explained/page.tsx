import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cron Scheduling Explained: Reading and Writing Cron Expressions | DevKit Blog',
  description: 'Learn how cron expressions work field by field. Steps, ranges, lists, the day-of-month vs day-of-week trap, timezones, and six-field Quartz syntax.',
  alternates: { canonical: '/blog/cron-scheduling-explained/' },
  keywords: 'cron explained, cron expression, cron syntax, crontab guide, quartz cron, cron schedule',
}

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Cron Scheduling Explained: Reading and Writing Cron Expressions</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>September 2026</time>
          <span>7 min read</span>
        </div>
      </header>

      <p>Cron has scheduled jobs on Unix systems for decades, and the same five-field syntax now shows up in cloud schedulers, CI pipelines, and container orchestrators. The syntax is compact to the point of looking cryptic, but it follows a small set of rules. Once those click, you can read any expression at a glance.</p>

      <h2>The five fields</h2>
      <p>A standard cron expression is five fields separated by spaces, each controlling one unit of time:</p>
      <pre><code>{`* * * * *
| | | | |
| | | | +-- day of week  (0-6, Sunday is 0)
| | | +---- month        (1-12)
| | +------ day of month (1-31)
| +-------- hour         (0-23)
+---------- minute       (0-59)`}</code></pre>
      <p>A job runs when the current time matches every field. Five asterisks means every field matches always, so the job runs every minute. To run at 3:30 every day:</p>
      <pre><code>{`30 3 * * *`}</code></pre>
      <p>Minute 30, hour 3, any day of month, any month, any day of week.</p>

      <h2>Steps with the slash</h2>
      <p>The slash defines a step, which means do something at a repeating interval. The most common form pairs it with an asterisk. To run every five minutes:</p>
      <pre><code>{`*/5 * * * *`}</code></pre>
      <p>Read that as every fifth value starting from zero in the minute field: 0, 5, 10, 15, and so on. Every two hours is:</p>
      <pre><code>{`0 */2 * * *`}</code></pre>
      <p>Note the leading zero in the minute field. Without it, every-two-hours would also fire on every minute within those hours. A step can also start from a specific point, so <code>10/15</code> in the minute field means start at 10, then every 15 after: 10, 25, 40, 55.</p>

      <h2>Ranges and lists</h2>
      <p>A hyphen makes a range. A comma makes a list of discrete values. They combine freely. To run on the hour, every hour from 9 to 17 (business hours):</p>
      <pre><code>{`0 9-17 * * *`}</code></pre>
      <p>To run at 8am and 8pm only:</p>
      <pre><code>{`0 8,20 * * *`}</code></pre>
      <p>To run every 15 minutes during business hours on weekdays, mix a step with ranges:</p>
      <pre><code>{`*/15 9-17 * * 1-5`}</code></pre>
      <p>Many cron versions also accept names, so <code>MON-FRI</code> and <code>JAN</code> work in the day-of-week and month fields.</p>

      <h2>The day-of-month vs day-of-week trap</h2>
      <p>This one surprises experienced engineers. When both the day-of-month and day-of-week fields are restricted (neither is an asterisk), most cron implementations treat them as OR, not AND. The job runs if either condition matches.</p>
      <p>Consider:</p>
      <pre><code>{`0 0 1 * 1`}</code></pre>
      <p>You might read this as midnight on the first of the month only if it is a Monday. In practice it runs at midnight on the 1st of every month AND on every Monday. If you need an AND relationship, leave one field as an asterisk and handle the other condition inside your script. This behavior is historical and consistent across classic cron, so plan for it rather than fighting it.</p>

      <h2>Timezones</h2>
      <p>Cron has no timezone field. Jobs run in the timezone of the system or scheduler running them, which is often UTC on servers. A schedule that looks like 9am may fire at a very different local hour. Two things save you here: set the scheduler timezone explicitly where the platform allows it, and remember daylight saving transitions. On the spring-forward day a job scheduled inside the skipped hour may not run, and on fall-back it may run twice. For anything time-critical, pin to UTC and convert in your application.</p>

      <h2>Six-field Quartz cron</h2>
      <p>Not all cron is five fields. The Quartz scheduler used in the Java ecosystem, and several cloud platforms, adds a seconds field at the front and sometimes a year field at the end:</p>
      <pre><code>{`0 0 12 * * ?
|
+-- seconds (0-59)`}</code></pre>
      <p>Quartz also uses the question mark to mean no specific value in the day-of-month or day-of-week field, which sidesteps the OR ambiguity above. Before copying an expression between systems, confirm whether the target expects five or six fields. A five-field expression pasted into a six-field parser shifts every value to the wrong unit.</p>

      <h2>Common expressions worth memorizing</h2>
      <pre><code>{`0 * * * *      every hour, on the hour
0 0 * * *      every day at midnight
0 0 * * 0      every Sunday at midnight
0 0 1 * *      first day of every month
*/10 * * * *   every ten minutes
0 2 * * 1-5    2am on weekdays`}</code></pre>
      <p>When you need something less routine, building the expression by picking values beats guessing and watching logs the next morning.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/cron-expression-generator" className="text-sm text-blue-600 hover:underline">Cron Expression Generator</Link>
        </div>
      </div>
    </article>
  )
}

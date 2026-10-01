import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Understanding Unix File Permissions: rwx, Octal, and umask | DevKit Blog',
  description: 'Learn how Unix file permissions work: read, write, execute for user, group, and other, octal notation, common modes like 644 and 755, umask, and why 777 is dangerous.',
  alternates: { canonical: '/blog/understanding-unix-file-permissions/' },
  keywords: 'unix file permissions, chmod explained, octal permissions, rwx permissions, 644 vs 755, umask, chmod 777 danger',
}

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Understanding Unix File Permissions: rwx, Octal, and umask</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>September 2026</time>
          <span>7 min read</span>
        </div>
      </header>

      <p>Run <code>ls -l</code> on any Unix or Linux system and the first column looks like line noise: <code>-rwxr-xr-x</code>. That string is a complete access control statement, and once you can read it, permission errors stop being guesswork. This guide breaks down what each piece means and how to set it correctly.</p>

      <h2>Three permissions, three audiences</h2>
      <p>Every file and directory grants three kinds of access:</p>
      <ul>
        <li><strong>read (r)</strong> — view the contents of a file, or list the entries in a directory</li>
        <li><strong>write (w)</strong> — change a file, or add and remove entries in a directory</li>
        <li><strong>execute (x)</strong> — run a file as a program, or enter a directory</li>
      </ul>
      <p>Those three permissions are assigned separately to three audiences: the <strong>user</strong> who owns the file, the <strong>group</strong> associated with it, and everyone <strong>other</strong>. That gives nine bits in total, which is exactly what the <code>rwxr-xr-x</code> string shows.</p>

      <h3>Reading the ls output</h3>
      <pre><code>{`-rwxr-xr-x  1  alice  staff  1024  file.sh
 \\__/\\__/\\__/
  |   |   |
  |   |   other: r-x (read, execute)
  |   group: r-x (read, execute)
  user: rwx (read, write, execute)`}</code></pre>
      <p>The very first character is the file type, not a permission. A dash means a regular file, <code>d</code> means a directory, and <code>l</code> means a symbolic link.</p>

      <h2>Octal notation</h2>
      <p>Typing out <code>rwx</code> strings is slow, so permissions are usually written as three octal digits. Each permission has a value:</p>
      <ul>
        <li>read = <strong>4</strong></li>
        <li>write = <strong>2</strong></li>
        <li>execute = <strong>1</strong></li>
      </ul>
      <p>Add the values for each audience to get its digit. Read plus write plus execute is 4 + 2 + 1 = 7. Read plus execute is 4 + 1 = 5. Read only is 4. Combine the three digits in user, group, other order:</p>
      <pre><code>{`rwx r-x r-x
 7   5   5    ->  755

rw- r-- r--
 6   4   4    ->  644`}</code></pre>

      <h2>Common modes and when to use them</h2>

      <h3>644 for regular files</h3>
      <p>The owner can read and write; everyone else can only read. This is the right default for source code, config files, documents, and web assets that should not be executable.</p>

      <h3>755 for programs and directories</h3>
      <p>The owner has full control; group and other can read and execute. Scripts, binaries, and most directories use this so others can run them or enter them without being able to modify them.</p>

      <h3>600 for secrets</h3>
      <p>Only the owner can read and write; nobody else sees anything. SSH private keys, token files, and credentials should use 600. Many tools refuse to use a key file that is readable by group or other, precisely because looser permissions leak secrets.</p>

      <h2>Execute means something different on directories</h2>
      <p>On a file, execute means run it. On a directory, execute means the ability to enter it and access files inside by name. This leads to a common surprise: a directory with read but no execute lets you list the names of its entries but not actually open them. If you can see a filename yet get permission denied when you open it, a missing execute bit on the directory is a likely cause.</p>

      <h2>umask sets the defaults</h2>
      <p>New files do not appear with wide-open permissions by accident. The <code>umask</code> value subtracts permissions from a base. Files start from 666 and directories from 777, then the umask bits are removed. A typical umask of <code>022</code> turns new files into 644 and new directories into 755, which matches the sensible defaults above.</p>
      <pre><code>{`umask        # show current value, e.g. 0022
umask 077    # new files 600, new dirs 700 (private)`}</code></pre>
      <p>Setting a tighter umask like 077 is a good habit on shared or server machines, because it makes everything you create private by default.</p>

      <h2>Why 777 is a mistake</h2>
      <p>When something does not work, searching the web often turns up the advice to run <code>chmod 777</code>. It usually makes the error disappear, which is exactly why it is dangerous. Mode 777 grants read, write, and execute to every account on the system, so any user or compromised process can overwrite the file, replace a script with their own code, or plant malware. The error went away because you removed the lock, not because you fixed the door.</p>
      <p>The correct fix is almost always a specific, minimal permission: give the owning user write access, or adjust group membership, rather than opening the file to the entire machine. When you need to figure out the right octal value for a given combination, the <Link href="/tools/chmod-calculator">chmod Calculator</Link> converts between rwx and octal both ways so you can set exactly the access you intend.</p>

      <h2>The habit worth keeping</h2>
      <p>Grant the least access that still lets the task work. Read when reading is enough, write only where changes belong, and execute only on things meant to run. Permissions are not bureaucracy; they are the boundary that keeps a small mistake from becoming a system-wide one.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/chmod-calculator" className="text-sm text-blue-600 hover:underline">chmod Calculator</Link>
        </div>
      </div>
    </article>
  )
}

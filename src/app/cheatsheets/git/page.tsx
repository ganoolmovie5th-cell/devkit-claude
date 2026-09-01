import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Git Cheat Sheet — Quick Reference | DevKit',
  description: 'Essential Git commands cheat sheet: init, clone, branch, merge, rebase, stash, log, reset, and remote operations.',
  alternates: { canonical: '/cheatsheets/git/' },
  keywords: 'git cheat sheet, git commands, git reference',
}

const sections = [
  {
    title: 'Setup & Init',
    commands: [
      ['git init', 'Initialize a new repository'],
      ['git clone <url>', 'Clone a remote repository'],
      ['git config --global user.name "Name"', 'Set global username'],
      ['git config --global user.email "email"', 'Set global email'],
    ],
  },
  {
    title: 'Basic Workflow',
    commands: [
      ['git status', 'Show working tree status'],
      ['git add <file>', 'Stage a file'],
      ['git add .', 'Stage all changes'],
      ['git commit -m "message"', 'Commit staged changes'],
      ['git commit -am "message"', 'Stage + commit tracked files'],
      ['git diff', 'Show unstaged changes'],
      ['git diff --staged', 'Show staged changes'],
    ],
  },
  {
    title: 'Branching',
    commands: [
      ['git branch', 'List local branches'],
      ['git branch <name>', 'Create a branch'],
      ['git checkout <branch>', 'Switch to branch'],
      ['git checkout -b <name>', 'Create and switch to branch'],
      ['git branch -d <name>', 'Delete a branch (safe)'],
      ['git branch -D <name>', 'Delete a branch (force)'],
      ['git merge <branch>', 'Merge branch into current'],
      ['git rebase <branch>', 'Rebase current onto branch'],
    ],
  },
  {
    title: 'Remote',
    commands: [
      ['git remote -v', 'List remotes'],
      ['git remote add origin <url>', 'Add a remote'],
      ['git push -u origin <branch>', 'Push and set upstream'],
      ['git push', 'Push to upstream'],
      ['git pull', 'Fetch and merge from upstream'],
      ['git fetch', 'Fetch without merging'],
      ['git push origin --delete <branch>', 'Delete remote branch'],
    ],
  },
  {
    title: 'Stash',
    commands: [
      ['git stash', 'Stash working changes'],
      ['git stash pop', 'Apply and remove latest stash'],
      ['git stash list', 'List all stashes'],
      ['git stash drop', 'Remove latest stash'],
      ['git stash apply stash@{n}', 'Apply specific stash'],
    ],
  },
  {
    title: 'History & Undo',
    commands: [
      ['git log --oneline', 'Compact commit log'],
      ['git log --graph', 'Visual branch graph'],
      ['git reset --soft HEAD~1', 'Undo last commit (keep changes staged)'],
      ['git reset --mixed HEAD~1', 'Undo last commit (keep changes unstaged)'],
      ['git reset --hard HEAD~1', 'Undo last commit (discard changes)'],
      ['git revert <commit>', 'Create a commit that undoes a commit'],
      ['git cherry-pick <commit>', 'Apply a commit from another branch'],
      ['git reflog', 'Show all reference updates'],
    ],
  },
  {
    title: 'Tags',
    commands: [
      ['git tag v1.0.0', 'Create lightweight tag'],
      ['git tag -a v1.0.0 -m "msg"', 'Create annotated tag'],
      ['git push origin v1.0.0', 'Push a tag'],
      ['git push origin --tags', 'Push all tags'],
    ],
  },
  {
    title: 'Useful Combos',
    commands: [
      ['git log --oneline --graph --all', 'Full visual history'],
      ['git diff HEAD~3..HEAD', 'Changes in last 3 commits'],
      ['git blame <file>', 'Show who changed each line'],
      ['git clean -fd', 'Remove untracked files and dirs'],
      ['git bisect start / good / bad', 'Binary search for a bug'],
    ],
  },
]

export default function GitCheatSheet() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Git Cheat Sheet</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Essential Git commands for everyday development. Generate ignore files with our <a href="/tools/gitignore-generator" className="text-blue-600 hover:underline">.gitignore Generator</a>.</p>
      </div>

      <div className="space-y-8">
        {sections.map(section => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{section.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {section.commands.map(([cmd, desc], i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 pr-4 font-mono text-blue-600 whitespace-nowrap">{cmd}</td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

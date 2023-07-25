import {GitHubIcon, ObsidianIcon} from '@/components/icons'
import RepositoryForm from "@/components/ui/repository-form";

export default async function Home() {
    return (
        <div className={'text-center flex flex-col flex-1 items-center justify-center gap-6'}>
            <div>
                <div className={'flex justify-center gap-4 items-center mb-8'}>
                    <GitHubIcon className={'w-24 h-24'}/>
                    <p className={'text-4xl font-bold animate-in rotate-[180deg] delay-300 transition-all duration-1000'}>X</p>
                    <ObsidianIcon className={'w-24 h-24'}/>
                </div>
                <h1 className={'text-4xl font-bold'}>GitHub Repository Browser</h1>
                <h2 className={'text-xl leading-[4rem]'}>A simple GitHub repository browser</h2>
                <p>
                    This is a simple GitHub repository browser, that allows you to browse through the files and folders
                    of any
                    GitHub repository.
                    <br/>
                    This is a test of the recursive repo browser, which is a recursive implementation of the repo
                    browser.
                </p>
                <p
                    className={
                        'italic p-4 bg-gradient-to-r from-neutral-200/50 to-purple-400/80 dark:to-purple-700/80 dark:from-neutral-400/80 rounded-3xl w-fit mx-auto m-6'
                    }
                >
                    Can be used especially for viewing your Obsidian vaults on GitHub.
                    <br/>
                    <span className={'font-bold'}>Note:</span> This is a work in progress, and is not yet ready for
                    production
                    use.
                </p>
            </div>

            <RepositoryForm/>
        </div>
    )
}

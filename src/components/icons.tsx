'use client'

import React from 'react'
import {cn} from '@/lib/utils'
import {motion} from 'framer-motion'

export interface SVGProps extends React.SVGAttributes<SVGSVGElement>, React.RefAttributes<SVGSVGElement> {
    className?: string
    children?: React.ReactNode
}

export const GitHubIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            fill = 'currentColor',
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
            fill?: string
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 98 98'
            className={cn('w-6 h-6', className)}
            {...props}
            ref={ref}
            fill={fill}
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z'
            >
                {children}
            </path>
        </svg>
    )
)

GitHubIcon.displayName = 'GitHub'

export const ObsidianIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            id='custom-logo'
            viewBox='0 0 512 512'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <defs>
                <radialGradient
                    id='b'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='matrix(-48 -185 123 -32 179 429.7)'
                >
                    <stop
                        stopColor='#fff'
                        stopOpacity='.4'
                    />
                    <stop
                        offset='1'
                        stopOpacity='.1'
                    />
                </radialGradient>
                <radialGradient
                    id='c'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='matrix(41 -310 229 30 341.6 351.3)'
                >
                    <stop
                        stopColor='#fff'
                        stopOpacity='.6'
                    />
                    <stop
                        offset='1'
                        stopColor='#fff'
                        stopOpacity='.1'
                    />
                </radialGradient>
                <radialGradient
                    id='d'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='matrix(57 -261 178 39 190.5 296.3)'
                >
                    <stop
                        stopColor='#fff'
                        stopOpacity='.8'
                    />
                    <stop
                        offset='1'
                        stopColor='#fff'
                        stopOpacity='.4'
                    />
                </radialGradient>
                <radialGradient
                    id='e'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='matrix(-79 -133 153 -90 321.4 464.2)'
                >
                    <stop
                        stopColor='#fff'
                        stopOpacity='.3'
                    />
                    <stop
                        offset='1'
                        stopOpacity='.3'
                    />
                </radialGradient>
                <radialGradient
                    id='f'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='matrix(-29 136 -92 -20 300.7 149.9)'
                >
                    <stop
                        stopColor='#fff'
                        stopOpacity='0'
                    />
                    <stop
                        offset='1'
                        stopColor='#fff'
                        stopOpacity='.2'
                    />
                </radialGradient>
                <radialGradient
                    id='g'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='matrix(72 73 -155 153 137.8 225.2)'
                >
                    <stop
                        stopColor='#fff'
                        stopOpacity='.2'
                    />
                    <stop
                        offset='1'
                        stopColor='#fff'
                        stopOpacity='.4'
                    />
                </radialGradient>
                <radialGradient
                    id='h'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='matrix(20 118 -251 43 215.1 273.7)'
                >
                    <stop
                        stopColor='#fff'
                        stopOpacity='.1'
                    />
                    <stop
                        offset='1'
                        stopColor='#fff'
                        stopOpacity='.3'
                    />
                </radialGradient>
                <radialGradient
                    id='i'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='matrix(-162 -85 268 -510 374.4 371.7)'
                >
                    <stop
                        stopColor='#fff'
                        stopOpacity='.2'
                    />
                    <stop
                        offset='.5'
                        stopColor='#fff'
                        stopOpacity='.2'
                    />
                    <stop
                        offset='1'
                        stopColor='#fff'
                        stopOpacity='.3'
                    />
                </radialGradient>
                <filter
                    id='a'
                    x='80.1'
                    y='37'
                    width='351.1'
                    height='443.2'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'
                >
                    <feFlood
                        floodOpacity='0'
                        result='BackgroundImageFix'
                    />
                    <feBlend
                        in='SourceGraphic'
                        in2='BackgroundImageFix'
                        result='shape'
                    />
                    <feGaussianBlur
                        stdDeviation='6.5'
                        result='effect1_foregroundBlur_744_9191'
                    />
                </filter>
            </defs>
            <rect
                id='logo-bg'
                fill='#262626'
                width='512'
                height='512'
                rx='100'
            />
            <g filter='url(#a)'>
                <path
                    d='M359.2 437.5c-2.6 19-21.3 33.9-40 28.7-26.5-7.2-57.2-18.6-84.8-20.7l-42.4-3.2a28 28 0 0 1-18-8.3l-73-74.8a27.7 27.7 0 0 1-5.4-30.7s45-98.6 46.8-103.7c1.6-5.1 7.8-49.9 11.4-73.9a28 28 0 0 1 9-16.5L249 57.2a28 28 0 0 1 40.6 3.4l72.6 91.6a29.5 29.5 0 0 1 6.2 18.3c0 17.3 1.5 53 11.2 76a301.3 301.3 0 0 0 35.6 58.2 14 14 0 0 1 1 15.6c-6.3 10.7-18.9 31.3-36.6 57.6a142.2 142.2 0 0 0-20.5 59.6Z'
                    fill='#000'
                    fillOpacity='.3'
                />
            </g>
            <path
                id='arrow'
                d='M359.9 434.3c-2.6 19.1-21.3 34-40 28.9-26.4-7.3-57-18.7-84.7-20.8l-42.3-3.2a27.9 27.9 0 0 1-18-8.4l-73-75a27.9 27.9 0 0 1-5.4-31s45.1-99 46.8-104.2c1.7-5.1 7.8-50 11.4-74.2a28 28 0 0 1 9-16.6l86.2-77.5a28 28 0 0 1 40.6 3.5l72.5 92a29.7 29.7 0 0 1 6.2 18.3c0 17.4 1.5 53.2 11.1 76.3a303 303 0 0 0 35.6 58.5 14 14 0 0 1 1.1 15.7c-6.4 10.8-18.9 31.4-36.7 57.9a143.3 143.3 0 0 0-20.4 59.8Z'
                fill='#6C31E3'
            />
            <path
                d='M182.7 436.4c33.9-68.7 33-118 18.5-153-13.2-32.4-37.9-52.8-57.3-65.5-.4 1.9-1 3.7-1.8 5.4L96.5 324.8a27.9 27.9 0 0 0 5.5 31l72.9 75c2.3 2.3 5 4.2 7.8 5.6Z'
                fill='url(#b)'
            />
            <path
                d='M274.9 297c9.1.9 18 2.9 26.8 6.1 27.8 10.4 53.1 33.8 74 78.9 1.5-2.6 3-5.1 4.6-7.5a1222 1222 0 0 0 36.7-57.9 14 14 0 0 0-1-15.7 303 303 0 0 1-35.7-58.5c-9.6-23-11-58.9-11.1-76.3 0-6.6-2.1-13.1-6.2-18.3l-72.5-92-1.2-1.5c5.3 17.5 5 31.5 1.7 44.2-3 11.8-8.6 22.5-14.5 33.8-2 3.8-4 7.7-5.9 11.7a140 140 0 0 0-15.8 58c-1 24.2 3.9 54.5 20 95Z'
                fill='url(#c)'
            />
            <path
                d='M274.8 297c-16.1-40.5-21-70.8-20-95 1-24 8-42 15.8-58l6-11.7c5.8-11.3 11.3-22 14.4-33.8a78.5 78.5 0 0 0-1.7-44.2 28 28 0 0 0-39.4-2l-86.2 77.5a28 28 0 0 0-9 16.6L144.2 216c0 .7-.2 1.3-.3 2 19.4 12.6 44 33 57.3 65.3 2.6 6.4 4.8 13.1 6.4 20.4a200 200 0 0 1 67.2-6.8Z'
                fill='url(#d)'
            />
            <path
                d='M320 463.2c18.6 5.1 37.3-9.8 39.9-29a153 153 0 0 1 15.9-52.2c-21-45.1-46.3-68.5-74-78.9-29.5-11-61.6-7.3-94.2.6 7.3 33.1 3 76.4-24.8 132.7 3.1 1.6 6.6 2.5 10.1 2.8l43.9 3.3c23.8 1.7 59.3 14 83.2 20.7Z'
                fill='url(#e)'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M255 200.5c-1.1 24 1.9 51.4 18 91.8l-5-.5c-14.5-42.1-17.7-63.7-16.6-88 1-24.3 8.9-43 16.7-59 2-4 6.6-11.5 8.6-15.3 5.8-11.3 9.7-17.2 13-27.5 4.8-14.4 3.8-21.2 3.2-28 3.7 24.5-10.4 45.8-21 67.5a145 145 0 0 0-17 59Z'
                fill='url(#f)'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M206 285.1c2 4.4 3.7 8 4.9 13.5l-4.3 1c-1.7-6.4-3-11-5.5-16.5-14.6-34.3-38-52-57-65 23 12.4 46.7 31.9 61.9 67Z'
                fill='url(#g)'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M211.1 303c8 37.5-1 85.2-27.5 131.6 22.2-46 33-90.1 24-131l3.5-.7Z'
                fill='url(#h)'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M302.7 299.5c43.5 16.3 60.3 52 72.8 81.9-15.5-31.2-37-65.7-74.4-78.5-28.4-9.8-52.4-8.6-93.5.7l-.9-4c43.6-10 66.4-11.2 96 0Z'
                fill='url(#i)'
            />
        </svg>
    )
)

ObsidianIcon.displayName = 'Obsidian'

export const MoonIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
            />
        </svg>
    )
)

MoonIcon.displayName = 'Moon'

export const SunIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
            />
        </svg>
    )
)

SunIcon.displayName = 'Sun'

export const ComputerIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25'
            />
        </svg>
    )
)

ComputerIcon.displayName = 'Computer'

export const HomeIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
        </svg>
    )
)

HomeIcon.displayName = 'Home'

export const XIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
            />
        </svg>
    )
)

XIcon.displayName = 'X'

export const Spinner = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            className={cn('fill-current stroke-current stroke-2 animate-spin w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                d='M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z'/>
            {children}
        </svg>
    )
)

Spinner.displayName = 'Spinner'

export const ErrorIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            ...props
        }: {
            className?: string
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 22.061 22.061'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <motion.g
                fillOpacity={0.976}
                fill='#f27474'
            >
                <motion.path
                    initial={{
                        pathLength: 0,
                        opacity: 0,
                    }}
                    animate={{
                        pathLength: 1,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                    }}
                    d='M11.03 0A11.03 11.03 0 000 11.03a11.03 11.03 0 0011.03 11.03 11.03 11.03 0 0011.03-11.03A11.03 11.03 0 0011.03 0zm0 .985A10.046 10.046 0 0121.076 11.03 10.046 10.046 0 0111.03 21.076 10.046 10.046 0 01.984 11.03 10.046 10.046 0 0111.03.985z'
                />
                <motion.path
                    initial={{
                        pathLength: 0,
                        opacity: 0,
                    }}
                    animate={{
                        pathLength: 1,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                    }}
                    d='M6.855 6.086l-.2.201a.48.48 0 000 .681l3.847 3.849-3.848 3.848a.48.48 0 000 .681l.201.201a.48.48 0 00.682 0l3.848-3.848 3.848 3.848a.48.48 0 00.682 0l.2-.2a.48.48 0 000-.682l-3.847-3.848 3.848-3.849a.48.48 0 000-.681l-.201-.201a.48.48 0 00-.682 0l-3.848 3.848-3.848-3.848c-.25-.204-.51-.155-.682 0z'
                />
            </motion.g>
        </svg>
    )
)

ErrorIcon.displayName = 'Error'

export const LockClosedIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            ...props
        }: {
            className?: string
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
            />
        </svg>
    )
)

LockClosedIcon.displayName = 'LockClosed'

export const LockOpenIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            ...props
        }: {
            className?: string
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
            />
        </svg>
    )
)

LockOpenIcon.displayName = 'LockOpen'

export const HomeSolidIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                d='M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z'/>
            <path
                d='M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z'/>
        </svg>
    )
)

HomeSolidIcon.displayName = 'HomeSolid'

export const ChevronDownIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 8.25l-7.5 7.5-7.5-7.5'
            />
        </svg>
    )
)

ChevronDownIcon.displayName = 'ChevronDown'

export const ChevronUpIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 15.75l-7.5-7.5-7.5 7.5'
            />
        </svg>
    )
)

ChevronUpIcon.displayName = 'ChevronUp'

export const ChevronLeftIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5l-7.5-7.5 7.5-7.5'
            />
        </svg>
    )
)

ChevronLeftIcon.displayName = 'ChevronLeft'

export const ChevronRightIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 19.5l7.5-7.5-7.5-7.5'
            />
        </svg>
    )
)

ChevronRightIcon.displayName = 'ChevronRight'

export const FolderClosedIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
        </svg>
    )
)

FolderClosedIcon.displayName = 'FolderClosedIcon'

export const FolderOpenIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"/>
        </svg>
    )
)

FolderOpenIcon.displayName = 'FolderOpenIcon'

export const DocumentIcon = React.forwardRef<SVGSVGElement, SVGProps>(
    (
        {
            className,
            children,
            ...props
        }: {
            className?: string
            children?: React.ReactNode
        },
        ref
    ) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('w-6 h-6', className)}
            ref={ref}
            {...props}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
    )
)

DocumentIcon.displayName = 'DocumentIcon'
'use client'

import Link from "next/link";
import {useRepositoriesWithUsername} from "@/hooks/useRepositories";

interface RepositoryListProps {
    username?: string
}

export default function RepositoryList({username}: RepositoryListProps) {
    const {data: repositories, isLoading} = useRepositoriesWithUsername(username)

    if (isLoading) return (
        <div>
            Loading...
        </div>
    )


    if (!repositories) return (
        <div>
            No repositories found
        </div>
    )

    //based on githubs repository api response, make a list of repositories with the following information:
    // - name
    // - description
    // - language
    // - stars
    // - forks
    // - license
    // - last updated
    // - url
    // - owner

    return (
        <ul>
            {repositories?.map((item, index) => {
                const {
                    id,
                    description,
                    full_name,
                    html_url,
                    language,
                    forks_count,
                    stargazers_count,
                    owner
                } = item;
                return (
                    <li key={id}>
                        <Link
                            href={{
                                pathname: `/notes/${full_name}`,
                            }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "16px",
                                borderBottom: "1px solid #e1e4e8",
                            }}
                        >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start"
                            }}>
                                <Link
                                    href={html_url}
                                    target="_blank"
                                    style={{
                                        alignItems: "flex-start",
                                        color: "#0366d6",
                                        paddingRight: "8px",
                                    }}
                                >
                                    <svg
                                        aria-label="repo"
                                        height="16px"
                                        viewBox="0 0 12 16"
                                        version="1.1"
                                        width="12px"
                                        role="img"
                                        style={{
                                            display: "inline-block",
                                            paddingLeft: "8px",
                                        }}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
                                        ></path>
                                    </svg>
                                    <p
                                        style={{
                                            paddingLeft: "8px",
                                            fontSize: "18px",
                                            fontWeight: "400",
                                            flex: "1",
                                            wordWrap: "break-word",
                                        }}
                                    >
                                        {full_name}
                                    </p>
                                </Link>
                                <Link
                                    style={{
                                        alignItems: "center",
                                    }}
                                    href={html_url}
                                    target="_blank"
                                >
                                    <svg
                                        aria-label="star"
                                        height="16"
                                        viewBox="0 0 14 16"
                                        version="1.1"
                                        width="14"
                                        role="img"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
                                        ></path>
                                    </svg>
                                    <div style={{
                                        paddingLeft: "8px",
                                    }}>Star
                                    </div>
                                </Link>
                            </div>
                            <div
                                style={{
                                    paddingTop: "8px",
                                    paddingBottom: "8px",
                                    paddingRight: "68px",
                                    maxWidth: "680px",
                                }}
                            >
                                {description}
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <div
                                    style={{
                                        alignItems: "center",
                                    }}>
                                    {forks_count > 0 && (
                                        <Link
                                            style={{
                                                alignItems: "center",
                                                marginRight: "16px",
                                            }}
                                            as="a"
                                            href={`${html_url}/network/members`}
                                            target="_blank"
                                            title={`${forks_count} forks`}
                                        >
                                            <svg
                                                aria-label="repo-forked"
                                                height="16"
                                                viewBox="0 0 10 16"
                                                version="1.1"
                                                width="10"
                                                role="img"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
                                                ></path>
                                            </svg>
                                            <p
                                                style={{
                                                    paddingLeft: "4px",
                                                }}>

                                                {forks_count}
                                            </p>
                                        </Link>
                                    )}
                                </div>
                                <div
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        flex: "1",
                                        display: "flex",
                                        paddingTop: "8px",
                                    }}
                                >
                                    {owner.avatar_url && (
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            paddingRight: "8px",
                                        }}>
                                            <p
                                                style={{
                                                    paddingRight: "8px",
                                                }}>
                                                Built by:
                                            </p>
                                            <img
                                                src={owner.avatar_url}
                                                alt={owner.login}
                                                width="25"
                                                height="25"
                                                title={owner.login}
                                            />
                                        </div>
                                    )}

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginLeft: "auto",
                                        }}>
                                        <svg
                                            aria-label="star"
                                            height="16"
                                            viewBox="0 0 14 16"
                                            version="1.1"
                                            width="14"
                                            role="img"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
                                            ></path>
                                        </svg>
                                        <p style={{
                                            marginLeft: "4px",
                                        }}>
                                            {stargazers_count} stars
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    )
}

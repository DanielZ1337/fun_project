import {CSSProperties, useState} from "react"
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {cn} from "@/lib/utils"
import CopyButton from "@/components/copy-button"
import {customCodeTheme} from "@/styles/custom-code-theme";
import {useTheme} from "next-themes";


function CodeBlock({
                       language,
                       value,
                       preClass,
                       codeClass,
                       copyable = true,
                       codeWrap = false,
                       copyOnHover = false,
                   }: {
    language: string
    value: string
    preClass?: string
    codeClass?: string
    copyable?: boolean
    codeWrap?: boolean
    copyOnHover?: boolean
}) {
    const theme = useTheme()
    value = value || ""
    const [isBlockHovered, setIsBlockHovered] = useState(false)

    return (
        <pre
            className={cn(
                `relative flex w-fit h-full overflow-hidden rounded-lg ${
                    value ? "border" : null
                } ${codeWrap ? "whitespace-pre-wrap" : null} `,
                preClass
            )}

            onMouseEnter={() => {
                setIsBlockHovered(true)
            }}
            onMouseLeave={() => {
                setIsBlockHovered(false)
            }}
        >
      <CopyButton
          value={value}
          copyable={copyable}
          isBlockHovered={copyOnHover ? isBlockHovered : true}
      />

      <div className="absolute -right-4 top-0 h-full w-12 bg-background blur"></div>
      <SyntaxHighlighter
          language={language}
          className={cn(
              `min-w-full px-4 py-3 text-sm`,
              codeClass
          )}
            style={theme.theme === "dark" ? customCodeTheme.dark : customCodeTheme.light}
      >
        {value}
      </SyntaxHighlighter>
    </pre>
    )
}

export default CodeBlock

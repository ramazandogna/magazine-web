import Editor from '@monaco-editor/react'
function Monaco({
  defaultLanguage,
  defaultValue,
  theme
}: {
  defaultLanguage: string
  defaultValue: string
  theme: string
}) {
  return (
    <Editor
      defaultLanguage={defaultLanguage}
      defaultValue={defaultValue}
      height="40vw"
      width="50%"
      theme={theme}
    />
  )
}

export default Monaco

import Editor, { OnChange } from '@monaco-editor/react'

function MonacoEditor({
  defaultLanguage,
  defaultValue,
  theme,
  onChange,
  width,
  height
}: {
  defaultLanguage: string
  defaultValue: string
  theme: string
  onChange: OnChange
  width: string
  height: string
}) {
  return (
    <Editor
      defaultLanguage={defaultLanguage}
      defaultValue={defaultValue}
      height={height || '44vw'}
      width={width || '44vw'}
      theme={theme}
      onChange={onChange} // Fix: Pass the 'change' prop of type 'OnChange'
    />
  )
}

export default MonacoEditor

import { useId, useState } from "react"

const Upload = ({ onUpload }) => {
  const id = useId()
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState(null)
  return (
    <div className="flex items-center gap-3 w-fit">
      <label htmlFor={id} className="flex items-center gap-3 cursor-pointer w-fit">
        <span className="px-4 py-2 rounded-xl border border-blue-300 text-sm text-blue-500 hover:bg-blue-50 transition-colors">
          Choose photo
        </span>
        <span className="text-sm text-gray-400">
          {fileName ?? "No file chosen"}
        </span>
      </label>
      <button
        onClick={() => file && onUpload(file)}
        disabled={!file}
        className="px-4 py-2 rounded-xl bg-blue-400 text-white text-sm disabled:opacity-40"
      >
        Upload
      </button>
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files[0] ?? null
          setFile(f)
          console.log('file:', f)
          setFileName(f?.name ?? null)
        }}
      />
    </div>
  )
}

export default Upload
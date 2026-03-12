'use client'

import { useState, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.match(/image\/(png|jpeg)/)) {
      setStatus('Please upload a PNG or JPG image.')
      return
    }
    setFile(selectedFile)
    setStatus(null)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(selectedFile)
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) handleFile(droppedFile)
  }, [])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const onDragLeave = useCallback(() => {
    setDragging(false)
  }, [])

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setStatus('Uploading...')

    try {
      const fileName = `${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('diagrams')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { error: dbError } = await supabase
        .from('analyses')
        .insert({
          file_name: file.name,
          file_path: fileName,
          file_type: file.type,
          status: 'pending',
        })

      if (dbError) throw dbError

      setStatus('Upload successful! Your diagram is being analyzed.')
      setFile(null)
      setPreview(null)
    } catch (error: any) {
      setStatus(`Error: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <main className="bg-gray-950 min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-4">
              Upload Your Diagram
            </h1>
            <p className="text-gray-400 text-lg">
              Drop your architecture diagram below and let our AI do the rest.
            </p>
          </div>

          {/* Drop Zone */}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition ${
              dragging
                ? 'border-emerald-500 bg-emerald-500/5'
                : 'border-gray-700 hover:border-gray-500'
            }`}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            {preview ? (
              <div>
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg mb-4"
                />
                <p className="text-gray-400 text-sm">{file?.name}</p>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📁</span>
                </div>
                <p className="text-white font-medium mb-2">
                  Drag & drop your diagram here
                </p>
                <p className="text-gray-500 text-sm">
                  or click to browse — PNG, JPG only
                </p>
              </div>
            )}

            <input
              id="fileInput"
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(e) => {
                const selected = e.target.files?.[0]
                if (selected) handleFile(selected)
              }}
            />
          </div>

          {/* Status Message */}
          {status && (
            <p className={`mt-4 text-center text-sm ${
              status.startsWith('Error') ? 'text-red-400' : 'text-emerald-400'
            }`}>
              {status}
            </p>
          )}

          {/* Upload Button */}
          {file && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white py-3.5 rounded-lg font-semibold text-lg transition"
            >
              {uploading ? 'Uploading...' : 'Analyze Architecture'}
            </button>
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}
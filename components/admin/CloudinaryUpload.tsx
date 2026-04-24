'use client';
import * as React from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Upload, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CloudinaryUploadProps {
    onUpload: (url: string) => void;
    folder?: string;
    label?: string;
    value?: string;
}

export function CloudinaryUpload({
    onUpload,
    folder = 'chess-unified',
    label = 'Upload Image',
    value
}: CloudinaryUploadProps) {
    const [uploadError, setUploadError] = React.useState<string | null>(null);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const isConfigured = !!cloudName && !!uploadPreset;

    const handleRemove = () => {
        onUpload('');
        setUploadError(null);
    };

    if (!isConfigured) {
        return (
            <div className="space-y-3">
                {label && (
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                        {label}
                    </label>
                )}
                <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <AlertTriangle size={28} className="text-amber-500" />
                    <div className="text-sm font-bold text-amber-700">Cloudinary Not Configured</div>
                    <p className="text-xs text-amber-600 leading-relaxed max-w-xs">
                        Add <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> and{' '}
                        <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code> to your <code>.env.local</code> file.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {label && (
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">
                    {label}
                </label>
            )}

            {/* Upload error banner */}
            {uploadError && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
                    <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                    <div>
                        <div className="font-bold mb-1">Upload Failed</div>
                        <div className="text-xs leading-relaxed">{uploadError}</div>
                        <button
                            onClick={() => setUploadError(null)}
                            className="mt-2 text-xs font-bold underline hover:no-underline"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}

            {/* If image exists, show preview */}
            {value ? (
                <div className="relative group aspect-video rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                    <img
                        src={value}
                        alt="Uploaded content"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button
                            onClick={handleRemove}
                            className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform shadow-lg"
                            aria-label="Remove image"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
                        <CheckCircle2 size={16} />
                    </div>
                </div>
            ) : (
                <CldUploadWidget
                    uploadPreset={uploadPreset}
                    options={{
                        folder: folder,
                        multiple: false,
                        maxFiles: 1,
                        sources: ['local', 'url'],
                        maxFileSize: 10000000, 
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onSuccess={(result: any, { widget }: any) => {
                        setUploadError(null);
                        if (result.info?.secure_url) {
                            let url = result.info.secure_url;
                            if (url.match(/\.(heic|heif)$/i)) {
                                url = url.replace(/\.(heic|heif)$/i, '.jpg');
                            }
                            onUpload(url);
                        }
                        if (widget) {
                            widget.close();
                        }
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onError={(error: any) => {
                        // Detect common preset misconfiguration
                        const isPresetError =
                            !error ||
                            Object.keys(error).length === 0 ||
                            error?.status === 400 ||
                            String(error).includes('preset');

                        const msg = isPresetError
                            ? `Upload preset "${uploadPreset}" is not configured as Unsigned in your Cloudinary dashboard. Go to cloudinary.com → Settings → Upload → Upload Presets and set it to "Unsigned".`
                            : (error?.statusText || error?.message || JSON.stringify(error) || 'Unknown error');

                        setUploadError(msg);
                    }}
                >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {({ open }: any) => {
                        return (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setUploadError(null);
                                    try {
                                        if (open) {
                                            open();
                                        } else {
                                            setUploadError('Widget is loading... Please wait a second and try again.');
                                        }
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    } catch (err: any) {
                                        console.error('Cloudinary open error:', err);
                                        setUploadError('Upload widget disconnected. Please refresh the page and try again.');
                                    }
                                }}
                                className={cn(
                                    "w-full aspect-video rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 group",
                                    !open
                                        ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-50"
                                        : "border-gray-200 hover:border-primary hover:bg-primary/5 text-gray-400 hover:text-primary"
                                )}
                            >
                                <div className={cn(
                                    "p-4 rounded-full transition-transform shadow-sm border",
                                    !open ? "bg-gray-200" : "bg-gray-50 border-gray-100 group-hover:scale-110"
                                )}>
                                    <Upload size={24} />
                                </div>
                                <div className="text-sm font-bold">
                                    {!open ? 'Loading...' : 'Tap to upload'}
                                </div>
                                <div className="text-[10px] uppercase font-bold tracking-tighter opacity-60">
                                    All Formats (Max 10MB)
                                </div>
                            </button>
                        );
                    }}
                </CldUploadWidget>
            )}
        </div>
    );
}
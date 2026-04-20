// app/dashboard/course/[id]/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="p-10 text-center">
            <h2 className="text-2xl font-bold">Failed to load course!</h2>
            <button onClick={() => reset()} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">
                Try Again
            </button>
        </div>
    );
}
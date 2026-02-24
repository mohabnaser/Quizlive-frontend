export function PlaceholderPage({ title }) {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
                <p className="text-dark-muted">This page is under construction.</p>
            </div>
        </div>
    )
}

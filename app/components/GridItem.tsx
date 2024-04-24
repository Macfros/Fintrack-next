

export default function GridItem({title, children}: any){
    return(
        <div className="flex flex-col items-center justify-center p-4 border border-slate-900 rounded-xl h-[450px]">
            <h3 className="text-2xl font-semibold mb-4 mt-2">{title}</h3>
            {children}
        </div>
    )
}
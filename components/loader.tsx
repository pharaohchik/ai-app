import { InlineSpinner  } from "react-tailwind-loaders";

export const Loader = () => {
    return (
        <div className='h-full w-full flex flex-col items-center justify-center'>
            <div className="w-16 h-16 relative">
                <InlineSpinner
                thumbColor="text-indigo-600"
                trackColor="text-gray-400"
                speed={3}
                size="large"
                />
            </div>
            <p className="text-sm text-muted-foreground pr-7">
                dron думает...       
            </p>
        </div>

    );
}

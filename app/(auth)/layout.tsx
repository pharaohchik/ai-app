const AuthLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className="h-screen items-center flex justify-center">
            {children}
        </div> 
    );
}
 
export default AuthLayout;
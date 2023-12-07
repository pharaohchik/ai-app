import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
    return ( 
        <div>
          <h1>Landing Page</h1>
          <div>
            <Link href="/sign-in">
              <Button>login</Button>
            </Link>
          </div>
          <div>
            <Link href="/sign-up">
              <Button>register</Button>
            </Link>
          </div>
        </div> 
    );
}
 
export default LandingPage;
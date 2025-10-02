import GameLibrary from "@/components/game-libary/GameLibrary";
import Header from "@/components/header";


const BASE = process.env.NEXT_PUBLIC_BASE_PATH || 'http://localhost:3000'


const Libary = () => {
    return (
        <div className="w-full min-h-screen bg-primary 
        "
        >

            <Header />
            
            <div className="h-screen w-full bg-fixed
            flex flex-col bg-center"
            style={{
                backgroundImage:`url(${BASE}/images/castle_scene.png)`
            }}
            >


                <div className=" text-background font-display mt-auto
                flex justify-center
                
                text-[20vw]
                md:text-[16vw]
                lg:text-[13vw]
                xl:text-[10vw]
                
                "
                >
                    <div className="w-5/6"
                    >
                        Games
                    </div>
                </div>

            </div>
            
            <div className="bg-primary z-30 relative pt-24"
            >
                <GameLibrary />
            </div>

        </div>
    );
}
 
export default Libary;
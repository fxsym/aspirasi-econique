import { useState } from "react";
import NavmenuAdmin from "./NavmenuAdmin";
import NavbarAdmin from "./NavbarAdmin";

export default function LayoutAdmin({ children }) {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <section className="flex">
            <NavmenuAdmin isOpen={showSidebar} onClose={() => setShowSidebar(false)} />

            <div className="w-full transition-all duration-500">
                <NavbarAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                <main className="">
                    {children}
                </main>
            </div>
        </section>
    )
}
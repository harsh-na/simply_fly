import React from 'react'
import Navbar from './Navbar'
import TextOnImage from './TextOnImage'
import { Grid2 } from '@mui/material'
import About from './About'
import FAQ from './FAQ'
import Team from './Team'
import Footer from '../../Footer'

export default function Homepage() {
    return (
        <>
            <Navbar
                // sx={{
                //     position: 'fixed',
                //     top: 0,
                //     left: 0,
                //     width: '100%',
                //     zIndex: 1100, // MUI-specific zIndex scale for app bars
                //     backgroundColor: 'background.paper', // Theme-aware color
                //     boxShadow: 1, // MUI shadow level
                // }}
            />

            <TextOnImage />

            <section id="about">
                <About />
            </section>

            <section id="faq">
                <FAQ />
            </section>

            <section id="team">
                <Team />
            </section>
            <section id="footer">
                <Footer />
            </section>
        </>
    )
}


// import React from 'react'
// import Navbar from './Navbar'
// import TextOnImage from './TextOnImage'
// import { Box } from '@mui/material'
// import About from './About'
// import FAQ from './FAQ'
// import Team from './Team'

// export default function Homepage() {
//     return (
//         <>
//             <Navbar
//             component="nav"
//                 sx={{
//                     position: 'fixed',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     zIndex: 1100, // MUI-specific zIndex scale for app bars
//                     backgroundColor: 'background.paper', // Theme-aware color
//                     boxShadow: 1, // MUI shadow level
//                 }}
//             />
//             <TextOnImage />

//             <section id="about">
//                 <About />
//             </section>

//             <section id="faq">
//                 <FAQ />
//             </section>

//             <section id="team">
//                 <Team />
//             </section>
//         </>
//     )
// }
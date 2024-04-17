import '@styles/globals.css';
import Nav from '@components/Nav';
import Providor from '@components/Providor';

export const metadata={
    title:"Promptopia",
    description: " Discover & Share AI Prompts"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
        <Providor>
            <div className='main'>
                <div className='gradient'/>
            </div>

            <main className='app'>
                <Nav />
                {children}
            </main>
        </Providor>
        </body>
    </html>
    
  )
}

export default RootLayout;
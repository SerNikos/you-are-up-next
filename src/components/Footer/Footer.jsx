import './Footer.css'

export default function Footer(){
    return(
        <div className='footer'>
            <p>© {new Date().getFullYear()} You Are Up Next All rights reserved.</p>
        </div>
    )
}
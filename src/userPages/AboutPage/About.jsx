import { Instagram, Line, Youtube } from "../../icon/Icon";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <div className='bg-[#F8FCFF] min-h-[90vh]'>
      <div className='p-1 flex items-center'>
          <Link to='/about' style={{ textDecoration: "none" }}>
            <div className='flex justify-start bg-[#6495ED] m-4 p-6 rounded-xl w-fit'>
              <h1 className='text-[#26363A] font-semibold text-3xl'>
                About Us
              </h1>
            </div>
          </Link>
        </div>
        <div className='flex justify-around'>
          <div className="w-2/3">
            <h1 className='text-3xl font-bold'>

            </h1>
            <h1 className='text-xl font-semibold p-5'>
            Whether you're craving a perfect Margherita or a classic Neapolitan, our handcrafted pizzas follow authentic Italian traditions, made with love and expertise passed down through generations. Order your slice of tradition today.
            </h1>
            <div className='mt-72 p-4'>
              <h1 className='text-xl font-semibold text-[#FF6240]'>Contact Us</h1>
              <div className='flex items-center gap-8'>
                <Link
                  className='hover:bg-[#E5ECF0] rounded-full p-2'
                  to='https://www.instagram.com/'
                >
                  <Instagram />
                </Link>
                <Link
                  className='hover:bg-[#E5ECF0] rounded-full p-2'
                  to='https://access.line.me/oauth2/v2.1/login?returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fscope%3Dopenid%2Bprofile%2Bfriends%2Bgroups%2Btimeline.post%2Bmessage.write%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fsocial-plugins.line.me%252Fwidget%252FloginCallback%253FreturnUrl%253Dhttps%25253A%25252F%25252Fsocial-plugins.line.me%25252Fwidget%25252Fclose%26state%3D9fec98665820574ebc349f47d089a6%26client_id%3D1446101138&loginChannelId=1446101138#/'
                >
                  <Line />
                </Link>
                <Link
                  className='hover:bg-[#E5ECF0] rounded-full p-2'
                  to='https://www.youtube.com/'
                >
                  <Youtube />
                </Link>
              </div>
            </div>
          </div>
          <div className='w-1/3 h-[60vh] bg-[#8397A1] p-4 rounded-3xl m-4'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3404435017774!2d100.53239597586516!3d13.758331697140768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29eca0a4dc2e7%3A0x944f80c1e57b451e!2z4Lit4Liy4LiE4Liy4Lij4Lin4Lij4Lij4LiT4Liq4Lij4LiT4LmM!5e0!3m2!1sth!2sth!4v1719200714556!5m2!1sth!2sth'
              width='100%'
              height='100%'
              allowFullScreen=''
              aria-hidden='false'
              tabIndex='0'
              className='border border-gray-400 rounded-3xl hover:shadow-[0px_0px_6px_rgba(174,143,78,0.4)]'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

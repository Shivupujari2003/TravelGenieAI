import React, { useState } from 'react';
import { Button } from '../button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from 'react-icons/fc';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const Getuser = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
    })
      .then((res) => {
        console.log('User data:', res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: Getuser,
    onError: (errorResp) => console.log('Login failed:', errorResp),
  });

  // Resize listener to detect mobile screen
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='p-3 shadow-md flex justify-between items-center px-5'>
      <Link to="/">
        <img src="/logo1.png" alt="Logo" className='h-[90px] w-[200px] rounded cursor-pointer' />
      </Link>
      <div>
        {user ? (
          <div className='flex items-center gap-5'>
            {isMobile ? (
              <Popover>
                <PopoverTrigger className="flex items-center gap-3">
                  <GiHamburgerMenu onClick={() => setMenuOpen(!menuOpen)} className='text-2xl cursor-pointer' />
                  <img src={user?.picture || "/ph2.jpg"} alt="User profile" className='h-[35px] w-[35px] rounded-full' />
                </PopoverTrigger>
                {menuOpen && (
                  <PopoverContent className="flex flex-col gap-3 mt-2">
                    <a href="/create-trip">
                      <Button variant="outline" className="rounded-full w-full bg-slate-900 text-white">+ Create Trip</Button>
                    </a>
                    <a href="/my-trips">
                      <Button variant="outline" className="rounded-full w-full bg-slate-900 text-white">My Trips</Button>
                    </a>
                    <h2
                      className='cursor-pointer'
                      onClick={() => {
                        googleLogout();
                        localStorage.clear();
                        navigate("/");
                      }}
                    >
                      Log-Out
                    </h2>
                  </PopoverContent>
                )}
              </Popover>
            ) : (
              <>
                <a href="/create-trip">
                  <Button variant="outline" className="rounded-full bg-slate-900 text-white h-auto">+ Create Trip</Button>
                </a>
                <a href="/my-trips">
                  <Button variant="outline" className="rounded-full bg-slate-900 text-white h-auto w-auto">My Trips</Button>
                </a>
                <Popover>
                  <PopoverTrigger>
                    <img src={user?.picture} alt="User profile" className='h-[45px] w-[45px] rounded-full' />
                  </PopoverTrigger>
                  <PopoverContent>
                    <h2
                      className='cursor-pointer'
                      onClick={() => {
                        googleLogout();
                        localStorage.clear();
                        navigate("/");
                      }}
                    >
                      Log-Out
                    </h2>
                  </PopoverContent>
                </Popover>
              </>
            )}
          </div>
        ) : (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="h-12 w-24 md:h-14 md:w-28" onClick={() => setOpenDialog(true)}>
                Sign-in
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription className="text-center">
                  <img src="/logo1.png" alt="Logo" className='h-16 w-40 mx-auto' />
                  <h2 className='font-bold text-lg text-black text-center mt-7'>Sign in with Google</h2>
                  <p className="text-center text-gray-800">Sign in to the app with Google Authentication</p>
                  <Button
                    onClick={() => {
                      login();
                      setOpenDialog(false);
                    }}
                    className='w-full mt-5 flex items-center justify-center gap-4'
                  >
                    <FcGoogle className='h-8 w-8' />
                    <span>Sign in with Google</span>
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default Header;



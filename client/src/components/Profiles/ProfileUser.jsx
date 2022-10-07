import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserProfile } from '../../reduxToolkit/Actions/usersActions'
import Footer from '../Footer/Footer'
import Header from '../Home/landin/Header'

export default function ProfileUser() {

    const dispatch = useDispatch()

    const profile = useSelector(state => state.usersPrincipal.profile)

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch])


    console.log(profile.shows);
    const rol = JSON.parse(window.localStorage.getItem('Rol'))


    return (
        <>
            <Header />
            <main className="">
                <section className="relative block" style={{ height: "500px" }}>
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover bg-black"
                        style={{
                            backgroundImage:
                                "url('https://res.cloudinary.com/esteban3232/image/upload/v1664933611/eventApp/marco-bicca-bpNr_FJNwrc-unsplash_ykupzo.jpg')"
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        ></span>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                        style={{ height: "70px" }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            {/* <polygon
                className="text-gray-900 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon> */}
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-black">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-green-400 w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <Link to={rol === 'ADMIN' ? `/admin/artists` : rol === 'ARTIST' ? `/artist/artists` : rol === 'USER' ? `/user/artists` : `/artists`} className="absolute flex items-center w-10 h-10 right-4 top-4 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Link>
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative p-10 -bottom-3">
                                            <img
                                                alt="..."
                                                src={profile.image}
                                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-10  -ml-24 lg:ml-24"
                                                style={{ maxWidth: "200px" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        {/* <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Connect
                      </button>
                    </div> */}
                                    </div>
                                    {/* <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          22
                        </span>
                        <span className="text-sm text-gray-500">Friends</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          10
                        </span>
                        <span className="text-sm text-gray-500">Photos</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          89
                        </span>
                        <span className="text-sm text-gray-500">Comments</span>
                      </div>
                    </div>
                  </div> */}
                                </div>
                                <div className="py-40 text-center mt-12">
                                    <h3 className="text-5xl lg:text-7xl font-semibold leading-normal mb-2 text-gray-800 capitalize">
                                        {profile.userName}
                                    </h3>
                                    <div className="text-xl leading-normal mt-0 mb-2 text-gray-700 font-bold capitalize">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500 "></i>{" "}
                                        {profile.city} - {profile.country}
                                    </div>
                                    {/* <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div className="mb-2 text-gray-700">
                    <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                    University of Computer Science
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-pink-500"
                        onClick={e => e.preventDefault()}
                      >
                        Show more
                      </a>
                    </div>
                  </div>
                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>

    )
}

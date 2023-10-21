
// user box at the top menu of the website
// Path: fronted-ts/src/components/UserBox.tsx

import { Link } from 'react-router-dom';
import useUserDataStore from '../stores/user'
import { UserDataStateInterface } from '../stores/user'

const SignIn = () => {
    return (
        <Link to='/login'>
            <button className='btn btn-primary'>Sign In</button>
        </Link>
    )
}

const SignOut = () => {
    //const clearUserData = useUserDataStore((state: UserDataStateInterface) => state.clearUserData);

    //get clearDataStore from useUserDataStore
    const clearUserData = useUserDataStore((state: any) => state.clearUserData);

    const logout = () => {
        clearUserData();
        window.location.href = "/";
    }

    return (
        <button onClick={logout} className='btn btn-primary'>Sign Out</button>
    )
}

const SignUp = () => {
    return (
        <Link to='/register'>
            <button className='btn btn-primary'>Sign Up</button>
        </Link>
    )
}

const UserBox = () => {
    let username = useUserDataStore((state: UserDataState) => state.username)

    if (username === "") {
        return (
            <div className='user-box'>
                <SignIn /> |
                <SignUp />
            </div>
        )
    }
    return (
        <div className='user-box'>
            username: {username} |
            <SignOut />
        </div>
    )
}

export default UserBox;
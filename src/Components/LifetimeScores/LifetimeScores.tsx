import { useQuery } from "@apollo/client"
import { USER } from "../../Api/Quieries"
import { useEffect } from "react"
import './LifetimeScores.css'

type Props = {
    gameCondition: string
}

export default function LifetimeScores(props: Props) {
    const { gameCondition } = props
    const storedUser = localStorage.getItem('user')
    const storedEmail = localStorage.getItem('email')
    const { loading: userLoading, data: userData, refetch: refetchData } = useQuery(USER, {
        variables: { username: storedUser, email: storedEmail }
    })

    useEffect(() => {
        refetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameCondition])

    return (
        <div className="text-center mb-3">
            <h1 className="underline text-lg">Lifetime Record</h1>
            <div className="grid grid-cols-3">
                <div>
                    <h2 className="text-base">Easy Games</h2>
                    {userLoading ? <p className="text-sm">Loading History....</p> :
                        <>
                            <p className="text-sm">Games: {userData.user.easyGames ? userData.user.easyGames.games : 'no games played'}</p>
                            <p className="text-sm">Wins: {userData.user.easyGames ? userData.user.easyGames.wins : 'no wins yet'}</p>
                            <p className="text-sm">Loses: {userData.user.easyGames ? userData.user.easyGames.loses : 'no loses yet'}</p>
                        </>
                    }
                </div>
                <div>
                    <h2 className="text-base">Medium Games</h2>
                    {userLoading ? <p className="text-sm">Loading History....</p> :
                        <>
                            <p className="text-sm">Games: {userData.user.mediumGames ? userData.user.mediumGames.games : 'no games played'}</p>
                            <p className="text-sm">Wins: {userData.user.mediumGames ? userData.user.mediumGames.wins : 'no wins yet'}</p>
                            <p className="text-sm">Loses: {userData.user.mediumGames ? userData.user.mediumGames.loses : 'no loses yet'}</p>
                        </>
                    }
                </div>
                <div>
                    <h2 className="text-base">Hard Games</h2>
                    {userLoading ? <p className="text-sm">Loading History....</p> :
                        <>
                            <p className="text-sm">Games: {userData.user.hardGames ? userData.user.hardGames.games : 'no games played'}</p>
                            <p className="text-sm">Wins: {userData.user.hardGames ? userData.user.hardGames.wins : 'no wins yet'}</p>
                            <p className="text-sm">Loses: {userData.user.hardGames ? userData.user.hardGames.loses : 'no loses yet'}</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
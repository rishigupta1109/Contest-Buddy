
import { useState, useEffect } from "react";
import "../styles/detailspage.css";
import { Button } from "@mui/material";
import Countdown from "react-countdown";
import logo from "../images/Contest.png";
import { AlarmAdd } from "@mui/icons-material";
import CircularIndeterminate from "./CircularIndeterminate";
const DetailsPage = ({User,setUser}) => {
    
    const [Contests,setContests]=useState([]);
    const [userData, setuserData] = useState(undefined);
    const [userloading, setuserLoading] = useState(true);
    const [usercontestloading, setcontestLoading] = useState(true);
    const fetchdata = async () => {
        setuserLoading(true);
        const url = `https://codeforces.com/api/user.info?handles=${User}`;
        const data = await fetch(url);
        try{
        let result=data.json().then(value => {
            setuserData(value.result);
            setuserLoading(false);
            if (value.result === undefined) {
                setUser(null);
                localStorage.removeItem("user");
                alert("User doesn`t exist");
            }
        }).catch(err => {
            setUser(null);
                localStorage.removeItem("user");
                alert("User doesn`t exist");
            })}
            catch(err){
            console.error(err);
            }
        
    }
    const fetchContests = async () => {
        setcontestLoading(true);
        const url = `https://codeforces.com/api/contest.list`;
        const data = await fetch(url);
        data.json().then(value => { setContests(value.result.filter((a) => { return a.phase === "BEFORE"; }).reverse());
        setcontestLoading(false)})
    }
    const UTCsectoDate = (sec) => {
        let date = new Date(0);
        date.setUTCSeconds(sec);
        return date;
    }
    useEffect(() => {
        fetchdata();
        fetchContests();
    }, [])
    const Completionist = () => <span>Contest is Live..</span>;
    return (
        <div className="detailspage column ">
            <div className="navbar row">
                <img src={logo} style={{height:"100px"}} alt="logo" />
                <Button onClick={() => { setUser(null); localStorage.removeItem("user"); }}  variant="contained" color="primary"
                            style={{ color: "black" }}
                            sx={{
                                ':hover': {
                                  bgcolor: 'secondary.main', // theme.palette.primary.main
                                  color: 'white',
                                },
                                borderRadius:"75px"
                              }}>logout</Button>
            </div>
            <div >
                {userloading ? <CircularIndeterminate/> :
                    <div className="row borderYellow se">
               <div className="column">
                    <img src={userData[0].titlePhoto} alt="image" />
                </div>
                <div className="column">
                    <div>handle: {userData[0].handle}</div>  
                    <div>rank: {userData[0].rank}</div>  
                    <div>rating: {userData[0].rating}</div>  
                    <br />
                    <div>maxRank: {userData[0].maxRank}</div>  
                    <div>maxRating: {userData[0].maxRating}</div>  
                </div>
                </div>}
            </div>
            <div className="contests">
                <h2>Upcoming Contests</h2>
                {usercontestloading&& <CircularIndeterminate/>}
                {!usercontestloading&&Contests.map((contest) => {
                    return (
                        <div className="contest column borderYellow">
                    <div className="row mpO">
                        <div>{contest.name}</div>
                    </div>
                    <div className="row mpO">
                        <div>
                            {UTCsectoDate(contest.startTimeSeconds).toDateString()}
                            <br />
                            {UTCsectoDate(contest.startTimeSeconds).toLocaleTimeString()}
                        </div>
                        <div>
                            <Countdown date={UTCsectoDate(contest.startTimeSeconds)} >
                                <Completionist />
                            </Countdown>
                        </div>
                    </div>
                </div>
                    )
                }) }
            </div>
        </div>

    )
}
export default DetailsPage;
import React from "react";
import "./Team.css";
import TeamCard from "../TeamCard/TeamCard";

const facultyCoordinators = [
  {
    name: "Richa Kumari",
    image: "/team_img/richa_kumari.jpg",
    linkedinID: "https://www.linkedin.com/in/richa-kumari-3835b0293/",
  },
  {
    name: "Keshav Sinha",
    image: "/team_img/keshav.jpeg",
    linkedinID:
      "https://www.linkedin.com/in/dr-keshav-sinha-a764b01ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
];

const Management = [
  {
    name: "Vedanshi Samant",
    position: "President",
    image: "/team_img/Vedanshi.JPG",
    linkedinID: "https://www.linkedin.com/in/vedanshi-samant-709879278/",
  },
  {
    name: "Hardik Raj Kappor",
    position: "Vice President",
    image: "/team_img/Hardik.png",
    linkedinID:
      "https://www.linkedin.com/in/hardik-raj-kapoor-03a680183?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Anish Kothiyal",
    position: "Treasurer",
    image: "/team_img/Anish.jpg",
    linkedinID: "https://www.upesmtc.com/ ",
  },
  {
    name: "Vansh Raj Chauhan",
    position: "Director Of Operations",
    image: "/team_img/Vansh_Raj_Chauhan.jpg",
    linkedinID: "https://www.linkedin.com/in/vansh-raj-chauhan-64b50a258/",
  },
  {
    name: "Sanya Sinha",
    position: "Managerial Director",
    image: "/team_img/Sanya_Sinha.jpg",
    linkedinID:
      "https://www.linkedin.com/in/sanya-sinha-a859ab244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Akshita Aggarwal",
    position: "Internal Operations Head",
    image: "/team_img/akshita_aggarwal.jpeg",
    linkedinID: "https://www.linkedin.com/in/akshita-aggarwal-381576284/",
  },
  {
    name: "Pallavi Singh",
    position: "Joint Secretary",
    image: "/team_img/pallavi_singh.jpeg",
    linkedinID: "https://www.linkedin.com/in/pallavi-singh-06b465286/",
  },
];

const StudentCoordinator = [
  {
    name: "Vibhor Minocha",
    position: "President",
    image: "/team_img/Vibhor_Minocha.jpg",
    linkedinID: "https://www.linkedin.com/in/vibhor-minocha-513b32220/",
  },
  {
    name: "Siddhant Srivastava",
    position: "Vice-President",
    image: "/team_img/Screenshot from 2024-02-04 14-09-46.png",
    linkedinID: "https://www.linkedin.com/in/siddhantsrivastava21/",
  },
  {
    name: "Ananya Singh",
    position: "Director of Operations",
    image: "/team_img/Ananya_singh.jpg",
    linkedinID:
      "https://www.linkedin.com/in/ananya-singh-15r25-8r1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Rajat Bisht",
    position: "Managerial Director",
    image: "/team_img/Rajat_Bisht.jpg",
    linkedinID: "https://www.linkedin.com/in/rajat-bisht-25b208237",
  },
  {
    name: "Mimansa Pathania",
    position: "Treasurer",
    image: "/team_img/miamansa.JPG",
    linkedinID: "https://www.linkedin.com/in/mimansa-pathania-3b38a2223/",
  },
];

const Advisor = [
  {
    name: "Samriddh Sharma",
    position: "Management and Records Advisory",
    image: "/team_img/samriddh_sharma.jpeg",
    linkedinID:
      "https://www.linkedin.com/in/samriddh-sharma-754565258/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Chetanya Jain Jain",
    position: "Public Relations Advisory",
    image: "/team_img/chetanya.JPG",
    linkedinID: "https://www.linkedin.com/in/chetanya-jain-838016210/",
  },
];

const WorkingTeam = [
  {
    name: "Divya Darshan Tiwari",
    position: "Management and Records Head",
    image: "/team_img/divya_darshan_tiwari.jpeg",
    linkedinID: "https://www.linkedin.com/in/divya-darshan-tiwari-9b6981240",
  },
  {
    name: "Kashish Turan",
    position: "Management and Records Associate Head",
    image: "/team_img/kashish_turan.jpeg",
    linkedinID: "https://www.linkedin.com/in/kashish-turan-b95b6626b/",
  },
  {
    name: "Kanhaiya Sethi",
    position: "Events Head",
    image: "/team_img/kanhaiya_sethi.jpeg",
    linkedinID:
      "https://www.linkedin.com/in/kanhaiya-sethi-0a0864270?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Vibhav Khaneja",
    position: "Public Relations Head",
    image: "/team_img/vibhav_khaneja.jpeg",
    linkedinID: "https://www.linkedin.com/in/vibhav-khaneja-863552256/",
  },
  {
    name: "Devansh Gaur",
    position: "Social Media Head",
    image: "/team_img/devansh_gaur.jpeg",
    linkedinID: "https://www.linkedin.com/in/devanshgaur7/",
  },
  {
    name: "Priyanshi",
    position: "Editorial Head",
    image: "/team_img/priyanshi.jpeg",
    linkedinID: "https://www.linkedin.com/in/priyanshi-99a067272/",
  },
  {
    name: "Kunal Shubh Sharma",
    position: "Editorial Associate Head",
    image: "/team_img/Kunal_Sharma.jpg",
    linkedinID: "https://www.linkedin.com/in/kunal-shubh-sharma-6303a72a7/",
  },
  {
    name: "Taraksh Goyal",
    position: "Technical Associate Head",
    image: "/team_img/tarraksh_goyal.jpeg",
    linkedinID: "https://www.linkedin.com/in/taraksh-goyal-86375831b/",
  },
  {
    name: "Shubhang Sharma",
    position: "Technical Associate Head",
    image: "/team_img/shubhang_sharma.jpeg",
    linkedinID: "https://www.linkedin.com/in/shubhang-sharma-40871a31b/",
  },
  {
    name: "Sarthak Jakhmola",
    position: "Design Head",
    image: "/team_img/sarthak_jakhmola.jpeg",
    linkedinID: "https://www.linkedin.com/in/sarthak-jakhmola-340049287/",
  },
  {
    name: "Saksham Joshi",
    postion: "Design Associate Head",
    image: "/team_img/saksham_joshi.jpeg",
    linkedinID: "https://www.linkedin.com/in/saksham-joshi-144476235/",
  },
  {
    name: "Shrey Sharma",
    position: "External PR Head",
    image: "/team_img/shrey_sharma.jpeg",
    linkedinID: "https://www.linkedin.com/in/shrey-sharma-34237024b/",
  },
];

const Alumni = [
  {
    name: "Rashi Trikha",
    image: "/team_img/Rashi.jpg",
    linkedinID:
      "https://www.linkedin.com/in/rashi-trikha-0832391a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Kartikey Khanna",
    image: "/team_img/Kartikeya.jpg",
    linkedinID:
      "https://www.linkedin.com/in/kartikeya-khanna-1274b7194?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Vishal Gupta",
    image: "/team_img/Vishal1.webp",
    linkedinID:
      "https://www.linkedin.com/in/vishal-gupta-6b6123194?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Aditya Kumar",
    image: "/team_img/aditya.png",
    linkedinID: "https://www.linkedin.com/in/aditya-kumar-220053208/",
  },
  {
    name: "Sanidhya Soni",
    image: "/team_img/sanidhya soni.png",
    linkedinID: "https://www.linkedin.com/in/sanidhya-soni/",
  },
  {
    name: "Yash Raj Singh",
    image: "/team_img/y1.png",
    linkedinID: "https://www.linkedin.com/in/yash-raj-singh-yrs/",
  },
  {
    name: "Rishabh Dhangar",
    image: "/team_img/rishabh.png",
    linkedinID: "https://www.linkedin.com/in/rishabh-dhangar/",
  },
  {
    name: "Tanish Garg",
    image: "/team_img/tanish.JPG",
    linkedinID:
      "https://www.linkedin.com/in/tanish-garg-5114aa236?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
];

function Team() {
  return (
    <>
      <div className="team-container">
        <div className="team-wrapper">
          <div className="team-heading">
            <h1>Meet our team</h1>
            <h2>Our great minds behind fueling this community</h2>
          </div>

          <div className="card-container">
            <h2>Faculty Coordinators</h2>

            <div className="wrapper-div">
              {facultyCoordinators.map((faculty) => (
                <TeamCard
                  name={faculty.name}
                  position={faculty.position}
                  image={faculty.image}
                  linkedinID={faculty.linkedinID}
                />
              ))}
            </div>

            <h2>Our Student Coordinator</h2>

            <div className="wrapper-div">
              {StudentCoordinator.map((sc) => (
                <TeamCard
                  name={sc.name}
                  image={sc.image}
                  linkedinID={sc.linkedinID}
                />
              ))}
            </div>

            <h2>Management Team</h2>

            <div className="wrapper-div">
              {Management.map((management) => (
                <TeamCard
                  name={management.name}
                  position={management.position}
                  image={management.image}
                  linkedinID={management.linkedinID}
                />
              ))}
            </div>

            <h2>Advisory Team</h2>

            <div className="wrapper-div">
              {Advisor.map((advisor) => (
                <TeamCard
                  name={advisor.name}
                  position={advisor.position}
                  image={advisor.image}
                  linkedinID={advisor.linkedinID}
                />
              ))}
            </div>

            <h2>Working Team</h2>

            <div className="wrapper-div">
              {WorkingTeam.map((wt) => (
                <TeamCard
                  name={wt.name}
                  position={wt.position}
                  image={wt.image}
                  linkedinID={wt.linkedinID}
                />
              ))}
            </div>

            <h2>Our Alumni</h2>

            <div className="wrapper-div">
              {Alumni.map((student) => (
                <TeamCard
                  name={student.name}
                  image={student.image}
                  linkedinID={student.linkedinID}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Team;

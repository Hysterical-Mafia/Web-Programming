//api script to add events automatically
document.addEventListener("DOMContentLoaded", async function () {
    const featuredEventsSection = document.getElementById("featured-events");

    try {
        const response = await fetch('https://mmafightcardsapi.adaptable.app/'); //this is where they get the scraped data from
        const data = await response.json();

        //if it fails show this
        if (data.error) {
            featuredEventsSection.innerHTML = "<p>Failed to load events</p>";
            return;
        }

        //adds events automatically
        data.data.forEach(event => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");

            //event title and date
            const title = document.createElement("h2");
            title.textContent = event.title;
            const date = document.createElement("p");
            date.textContent = `Date: ${event.date}`;

            //check and put the logo of the company hosting the event
            const orgLogo = document.createElement("img");
            orgLogo.classList.add("organization-logo");

            //Only append the logo if the event organization matches/has that word in the title
            if (event.title.includes("UFC")) {
                orgLogo.src = "Images/Ultimate-Fighting-Championship-UFC-Logo-2015-present.jpg";
                orgLogo.alt = "UFC Logo";
                eventCard.appendChild(orgLogo);

            } else if (event.title.includes("RIZIN")) {
                orgLogo.src = "Images/rizin_logo_by_cesareric-d9mhta5.png";
                orgLogo.alt = "Rizin Logo";
                eventCard.appendChild(orgLogo);

            } else if (event.title.includes("ONE")) {
                orgLogo.src = "Images/oneLogo.jpg";
                orgLogo.alt = "ONE Championship Logo";
                eventCard.appendChild(orgLogo);

            } else if (event.title.includes("PFL")) {
                orgLogo.src = "Images/PFL_logo.jpg";
                orgLogo.alt = "PFL Logo";

        } else {
            orgLogo.src = "Images/mmainsiderdefaultlogo.png"; //Default logo if no match
            orgLogo.alt = "Organization Logo";
        }
       
                eventCard.appendChild(orgLogo);

            //Adds fight details
            const fightsList = document.createElement("ul");
            event.fights.forEach(fight => {
                const fightItem = document.createElement("li");
                fightItem.classList.add("fight-item");

                //Fighter A details
                const fighterADiv = document.createElement("div");
                fighterADiv.classList.add("fighter-details-box");

                const fighterAImg = document.createElement("img");
                fighterAImg.src = fight.fighterA.picture || "Images/fighteroneleftside.png";
                fighterAImg.alt = `${fight.fighterA.name}'s picture`;
                fighterAImg.classList.add("fighter-photo");

                const fighterAInfo = document.createElement("p");
                fighterAInfo.innerHTML = `
                <a href="${fight.fighterA.link}" target="_blank">
              <strong class="fighter-name">${fight.fighterA.name}</strong>  
        <br>
        <span class="fighter-record">Record: ${fight.fighterA.record}</span> 
        <br>
        <span class="fighter-weight">Weight: ${fight.weight} lbs</span> 
        <br>
        <img src="${fight.fighterA.country}" alt="Flag" class="fighter-flag">
    </a>
`;

                fighterADiv.appendChild(fighterAImg);
                fighterADiv.appendChild(fighterAInfo);

                //Fighter B details
                const fighterBDiv = document.createElement("div");
                fighterBDiv.classList.add("fighter-details-box2");

                const fighterBImg = document.createElement("img");
                fighterBImg.src = fight.fighterB.picture || "Images/fightertworightside.png";
                fighterBImg.alt = `${fight.fighterB.name}'s picture`;
                fighterBImg.classList.add("fighter-photo");

                const fighterBInfo = document.createElement("p");
                fighterBInfo.innerHTML = `
             <a href="${fight.fighterB.link}" target="_blank">
        <strong class="fighter-name">${fight.fighterB.name}</strong>  
        <br>
        <span class="fighter-record">Record: ${fight.fighterB.record}</span> 
        <br>
        <span class="fighter-weight">Weight: ${fight.weight} lbs</span> 
        <br>
        <img src="${fight.fighterB.country}" alt="Flag" class="fighter-flag">
    </a>
`;
                 
                fighterBDiv.appendChild(fighterBImg);
                fighterBDiv.appendChild(fighterBInfo);

                //Combine Fighter A and Fighter B
                fightItem.appendChild(fighterADiv);
                fightItem.appendChild(fighterBDiv);

              
                fightsList.appendChild(fightItem);
            });

        


            //Link to full event page
            const eventLink = document.createElement("a");
            eventLink.href = event.link;
            eventLink.target ="_blank";
            eventLink.textContent = "View Details";

            //Append everything to the event card
            eventCard.appendChild(title);
            eventCard.appendChild(date);
            eventCard.appendChild(fightsList);
            eventCard.appendChild(eventLink);

            //Append the event card to the featured events section
            featuredEventsSection.appendChild(eventCard);
        });


    } catch (error) {
        console.error("Error fetching data:", error);
        featuredEventsSection.innerHTML = "<p>Failed to load events. Please try again later.</p>";
    }
});


//sign up/sign in js

function ValidateSignUpForm() {
    // Email
    var email = document.forms["SignUpForm"]["Email"].value;
    if (email == null || email == "") {
        alert("Email must be filled out.");
        return false;
    }

    //phone Number
    var phoneNumber = document.forms["SignUpForm"]["PhoneNumber"].value;
    if (phoneNumber == null || phoneNumber == "") {
        alert("Phone Number must be filled out.");
        return false;
    }

    //check if phone number contains only digits and has the correct length
    if (isNaN(phoneNumber)) {
        alert("Phone Number must contain only digits.");
        return false;
    }
    if (phoneNumber.length !== 10) {
        alert("Phone Number must be 10 digits long.");
        return false;
    }

    //password
    var password = document.forms["SignUpForm"]["Password"].value;
    if (password == null || password == "") {
        alert("Password must be filled out.");
        return false;
    }

    //password needs to be at least 8 characters
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return false;
    }

    //confirm password
    var confirmPassword = document.forms["SignUpForm"]["ConfirmPassword"].value;
    if (confirmPassword == null || confirmPassword == "") {
        alert("Confirm Password must be filled out.");
        return false;
    }

    //check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    return true;
}

//sign In Validate
function ValidateSignInForm() {
    //email
    var email = document.forms["SignInForm"]["Email"].value;
    if (email == null || email == "") {
        alert("Email must be filled out.");
        return false;
    }

    //password
    var password = document.forms["SignInForm"]["Password"].value;
    if (password == null || password == "") {
        alert("Password must be filled out.");
        return false;
    }

    return true;
}

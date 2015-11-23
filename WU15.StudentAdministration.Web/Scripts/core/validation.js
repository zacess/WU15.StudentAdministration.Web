function validate() {   
    
    var name = courseList.name.value;
    var credits = courseList.credits.value;
    var year = courseList.year.value;
    var term = courseList.term.value;
            if (name == "") {
                alert("Skriv in ett namn på kursen!")
                document.courseList.name.focus();
                return false;
            } else if (credits == "") {
                alert("Skriv in poängen för kursen!")
                document.courseList.credits.focus();
                return false;
            } else if (year == "") {
                alert("Skriv in året för kursen!")
                document.courseList.year.focus();
                return false;
            } else if(term == "") {
                alert("Skriv in vilken termin kursen startar!")
                document.courseList.term.focus();
                return false;
            } else {
                return true;
            }
              
}

function validate2() {    
    var name = courseLists.name.value;
    var credits = courseLists.credits.value;
    var year = courseLists.year.value;
    var term = courseLists.term.value;    
        if (name == "") {
            alert("Skriv in ett namn på kursen!")
            document.courseLists.name.focus();
            return false;
        } else if (credits < 0.5) {
            alert("Skriv in poängen för kursen!")
            document.courseLists.credits.focus();
        } else if (year == "") {
            alert("Skriv in året för kursen!")
            document.courseLists.year.focus();
        } else if (term == "") {
            alert("Skriv in vilken termin kursen startar!")
            document.courseLists.term.focus();
            return false;
        } else {
            return true;
        }
    }

function validate3() {   
    var firstName = studentList.firstName.value;    
    var lastName = studentList.lastName.value;
    var personalId = studentList.personalId.value;   
    
        if (firstName == "") {
            alert("Skriv in studentens förnamn!")
            document.studentList.firstName.focus();
            return false;
        } else if (lastName == "") {
            alert("Skriv in studentens efternamn!")
            document.studentList.lastName.focus();
            return false;
        } else if (personalId == "") {
            alert("Skriv in studentens personnummer!")
            document.studentList.personalId.focus();
            return false;
        } else {
            return true;
        }
}
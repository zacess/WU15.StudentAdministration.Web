﻿$(document).ready(function () {

    // Setup initial page parameters.
    Page.setup({
        organizationId: "c08bdab7-ed3d-4048-8338-d4f14f2770a8",
        numberOfColumnsPerRow: 3,
        studentsUrl: "http://localhost:45959/api/students/",
        coursesUrl: "http://localhost:45959/api/courses/",
        //studentsUrl: "http://api.wu15.se/api/students/",
        //coursesUrl: "http://api.wu15.se/api/courses/",
        defaultPlaceholder: $("#defaultPlaceholder"),
        courseDetailsPlaceholder: $("#courseDetailsPlaceholder"),
        courseDetailsStudentListPlaceholder: $("#courseDetailsStudentListPlaceholder"),
        courseDetailsStudentSelectList: $("#courseDetailsStudentSelectList"),
        courseListPlaceholder: $("#courseListPlaceholder"),
        studentListPlaceholder: $("#studentListPlaceholder"),
        studentDetailsPlaceholder: $("#studentDetailsPlaceholder")
    });

    // Do some page bootstrapping.
    Page.init();
    
    // Display course details for clicked course.
    $("#defaultPlaceholder").on("click", ".list-item", function (event) {
        var id = $(event.target).data("itemId");
        console.log("[#defaultPlaceholder.click]: Course list clicked: " + id);
        if (id) {
            Page.deselectMenu();
            Page.displayCourseDetails(id);
            Page.selectMenu("Skapa Kurs");
        }
    });

    // Cancel the course details view.
    $("#courseDetailsCancelButton").on("click", function (event) {
        console.log("[#courseDetailsCancelButton.click]: Course details canceled.");

        // De-scelect the top menu button.
        Page.deselectMenu();        
        Page.displayDefault();
        Page.selectMenu("Start");
    });

    // Save the course details.
    $("#courseDetailsForm").submit(function (event) {
        event.preventDefault();
        if (validate2()) {
            console.log("[courseDetailsForm.submit]: Submitted course details form.");

            var course = Utilities.formToJson(this);
            course.students = [];
        
        var student = null;
        $(".registered-student").each(function () {
            student = {
                id: $(this).data("id"),
                firstName: $(this).data("firstName"),
                lastName: $(this).data("lastName")
            }
            course.students.push(student);
        });
        
        Page.saveCourseAndDisplayDefault(course);
        }
    });

    // Remove a registered student.
    $("#courseDetailsStudentListPlaceholder").on("click", ".remove-registered-student", function (event) {
        var item = $(this).closest(".list-group-item")[0];

        // Append to the option list.
        var id = $(item).data("id");
        var firstName = $(item).data("firstName");
        var lastName = $(item).data("lastName");
        var personalId = $(item).data("personalId");
        var student = { id: id, firstName: firstName, lastName: lastName, personalId: personalId }
        Page.appendStudentSelectOption(student);

        // Remove from the registered list.
        $(item).remove();
    });

    // Register a student.
    $("#registerSelectedStudentButton").on('click', function (event) {

        Page.registerSelectedStudent();
    });


    $('.navbar li, a').click(function (e) {
        $('.navbar li.active').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }

        e.preventDefault();
    });


    $(".navigation").on("click", function () {
        var panel = this.href.substr(this.href.indexOf("#") + 1);

        console.log(panel);
        Page.navigate(panel);
    });

    // Save the new course details from the course list view.
    $("#courseListAddCourseForm").submit(function (event) {        
        event.preventDefault();
        if (validate()){
        console.log("[courseListAddCourseForm.submit]: Submitted the new course form.");

        var course = Utilities.formToJson(this);
        course.students = [];

        $(this)[0].reset();        
        Page.saveCourseDetails(course);
    }
    });
    
    // Display the edit form for student
    $("#studentListPlaceholder").on("click", ".edit", function (event) {
        var studentId = $(this).data("itemId");
        console.log("[#studentListPlaceholder.click]: Student id clicked: " + studentId);
        if (studentId) {
            $("#studentDetailsForm").show();
            Page.deselectMenu();
            Page.displayStudentDetailsPlaceholder(studentId);
        }        
    });

    // Cancel editing
    $("#studentDetailsCancelButton").on("click", function (event) {
        event.preventDefault();
        console.log("[#studentDetailsCancelButton.click]: Student details canceled.");

        // De-scelect the top menu button.
        Page.deselectMenu();
        $("#studentDetailsForm").hide();
        Page.displayStudentList();
        Page.selectMenu("Studenter");
    });

    // Save the edited student
    $("#studentDetailsForm").submit(function (event) {
        event.preventDefault();
        
            console.log("[studentDetailsForm.submit]: Submitted the new student form.");

            var student = Utilities.formToJson(this);

            $(this)[0].reset();
            Page.deselectMenu();
            $("#studentDetailsForm").hide();
            Page.saveStudentAndDisplayStudents(student);
            Page.selectMenu("Studenter");        
        
    });

    // Save the new student details from the student list view.
    $("#studentListAddStudentForm").submit(function (event) {
        event.preventDefault();
        if (validate3()) {
            console.log("[studentListAddStudentForm.submit]: Submitted the new student form.");

            var student = Utilities.formToJson(this);

            $(this)[0].reset();
            $("#studentDetailsForm").hide();
            Page.saveStudentAndDisplayStudents(student);
        }
    });


    $(document).on("courseSavedCustomEvent", function (event) {
        console.log("[courseSavedCustomEvent]: " + event.message.description);
        console.log("[courseSavedCustomEvent]: " + event.message.data);

        Page.displayCourseList();
    });

    $(document).on("studentSavedCustomEvent", function (event) {
        console.log("[studentSavedCustomEvent]: " + event.message.description);
        console.log("[studentSavedCustomEvent]: " + event.message.data);

        Page.displayStudentList();
    });
});
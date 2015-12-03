﻿using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using WU15.StudentAdministration.Web.DataAccess;
using WU15.StudentAdministration.Web.Models;

namespace WU15.StudentAdministration.Web.API
{
    public class CoursesController : ApiController
    {
        private DefaultDataContext db = new DefaultDataContext();

        [HttpGet]
        public IEnumerable<Course> Get()
        {
            return db.Courses.Include(x => x.Students).OrderByDescending(x => x.Name);
        }

        public Course Get(int id)
        {
            return db.Courses.Include(x => x.Students).FirstOrDefault(x => x.Id == id);
        }

        public string Post(Course course)
        {
            Course courseToUpdate = null;
            courseToUpdate = course.Id > 0 ? db.Courses.Include("Students").First(i => i.Id == course.Id) : new Course();

            courseToUpdate.Credits = course.Credits;
            courseToUpdate.Name = course.Name;
            courseToUpdate.Term = course.Term;
            courseToUpdate.Year = course.Year;

            foreach (var student in db.Students)
            {
                if (course.Students.All(item => item.Id != student.Id)) // Contains
                {
                    courseToUpdate.Students.Remove(student);
                }
                else
                {
                    courseToUpdate.Students.Add(student);
                }
            }

            if (course.Id > 0)
            {
                db.Entry(courseToUpdate).State = EntityState.Modified;
            }
            else
            {
                db.Courses.Add(courseToUpdate);
            }

            db.SaveChanges();

            return course.Name;

        }

        [AcceptVerbs("DELETE")]
        public void Delete(int id)
        {
            var course = db.Courses.FirstOrDefault(x => x.Id == id);
            db.Courses.Remove(course);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WU15.StudentAdministration.Web.DataAccess;
using WU15.StudentAdministration.Web.Models;

namespace WU15.StudentAdministration.Web.API
{
    public class StudentsController : ApiController
    {
        private DefaultDataContext db = new DefaultDataContext();

        public IEnumerable<Student> Get()
        {
            var students = db.Students.Include("Courses").OrderBy(x => x.FirstName);

            return students;
        }

        public Student Get(int id)
        {
            return db.Students.FirstOrDefault(x => x.Id == id);
        }

        public string Post(Student student)
        {
            Student studentToUpdate = null;

            if (student.Id > 0)
            {
                studentToUpdate = db.Students.First(i => i.Id == student.Id);
            }
            else
            {
                studentToUpdate = new Student();
            }

            studentToUpdate.FirstName = student.FirstName;
            studentToUpdate.LastName = student.LastName;
            studentToUpdate.Courses = student.Courses;
            studentToUpdate.personalId = student.personalId;

            if (student.Id > 0)
            {
                db.Entry(studentToUpdate).State = EntityState.Modified;
            }
            else
            {
                db.Students.Add(studentToUpdate);
            }

            db.SaveChanges();

            return string.Format("{0} {1}", student.FirstName, student.LastName);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            var student = db.Students.FirstOrDefault(x => x.Id == id);
            db.Students.Remove(student);
            db.SaveChanges();
        }
    }
}
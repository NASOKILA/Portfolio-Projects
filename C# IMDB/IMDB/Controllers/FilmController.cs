using System.Linq;
using System.Net;
using System.Web.Mvc;
using IMDB.Models;
using System.Collections.Generic;

namespace IMDB.Controllers
{
    [ValidateInput(false)]
    public class FilmController : Controller
    {
        [HttpGet]
        [Route("")]
        public ActionResult Index()
        {

            using (var db = new IMDBDbContext())
            {
                List<Film> films = db.Films.ToList();

                return View(films);
            }
        }

        [HttpGet]
        [Route("create")]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Route("create")]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Film film)
        {
            if (ModelState.IsValid)
            {

                using (var db = new IMDBDbContext())
                {
                    db.Films.Add(film);
                    db.SaveChanges();

                    return RedirectToAction("Index");
                }
            }

            return View();
        }

        [HttpGet]
        [Route("edit/{id}")]
        public ActionResult Edit(int? id)
        {

            if (id == null)
            {
                return HttpNotFound();
            }

            using (var db = new IMDBDbContext())
            {

                Film film = db.Films.Find(id);

                if (film == null)
                {
                    return Redirect("/");
                }

                return View(film);
            }
            
        }

        [HttpPost]
        [Route("edit/{id}")]
        [ValidateAntiForgeryToken]
        public ActionResult EditConfirm(int? id, Film filmModel)
        {

            if (id == null)
            {
                return HttpNotFound();
            }

            using (var db = new IMDBDbContext())
            {

                Film film = db.Films.Find(id);

                if (!ModelState.IsValid)
                {
                    return RedirectToAction("edit");
                }

                if (film == null)
                {
                    return Redirect("/");
                }

                film.Name = filmModel.Name;
                film.Genre = filmModel.Genre;
                film.Director = filmModel.Director;
                film.Year = filmModel.Year;

                db.SaveChanges();

                return Redirect("/");
            }

        }

        [HttpGet]
        [Route("delete/{id}")]
        public ActionResult Delete(int? id)
        {

            if (id == null)
            {
                return HttpNotFound();
            }


            using (var db = new IMDBDbContext())
            {
                Film film = db.Films.Find(id);

                if (film == null)
                {
                    return Redirect("/");
                }

                return View(film);
            }

        }

        [HttpPost]
        [Route("delete/{id}")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirm(int? id, Film filmModel)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            using (var db = new IMDBDbContext())
            {
                Film film = db.Films.Find(id);
                db.Films.Remove(film);
                db.SaveChanges();

                return Redirect("/");

            }
            
        }
    }
}
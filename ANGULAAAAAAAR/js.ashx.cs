using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ANGULAAAAAAAR
{
    /// <summary>
    /// Summary description for js
    /// </summary>
    public class js : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/javascript";
            var jsPath = context.Server.MapPath("~/js");

            var modules = System.IO.Directory.GetFiles(jsPath, "*.js", System.IO.SearchOption.AllDirectories).Where(f => f.ToLower().Contains("module"));
            var others = System.IO.Directory.GetFiles(jsPath, "*.js", System.IO.SearchOption.AllDirectories).Where(f => !f.ToLower().Contains("module"));

            foreach (var file in modules)
            {
                WriteFile(context, file);
            }
            foreach (var file in others)
            {
                WriteFile(context, file);
            }
        }

        private void WriteFile(HttpContext context, string file) {
            context.Response.Write(System.IO.File.ReadAllText(file));
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
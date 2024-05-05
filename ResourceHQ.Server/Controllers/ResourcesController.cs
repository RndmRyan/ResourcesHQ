using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Xml.Linq;

namespace ResourceHQ.Server.Controllers
{
	[Route("api/[controller]")]

	[ApiController]
	public class ResourceController : ControllerBase
	{
		private IConfiguration _configuration;

		public ResourceController(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		//--------------- LOGIN & REGISTERATION

		[HttpPost]
		[Route("AddUser")]
		public JsonResult AddUser([FromForm] string name, [FromForm] string email, [FromForm] string password, [FromForm] string role)
		{
			string query = "INSERT INTO users (name, email, password, userrole, registerstatus) VALUES " +
				"(@name, @email, @password, @role, 'pending');";
			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					mycmd.Parameters.AddWithValue("@name", name);
					mycmd.Parameters.AddWithValue("@email", email);
					mycmd.Parameters.AddWithValue("@password", password);
					mycmd.Parameters.AddWithValue("@role", role);
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult("User Added Successfully");
		}

		[HttpGet]
		[Route("GetUser")]
		public JsonResult GetUser(string email, string password)
		{
			string query = "SELECT * FROM users WHERE email = '" + email + "' AND " +
				"password = '" + password + "' AND registerstatus = 'registered';";
			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult(table);
		}

		//--------------- STUDENT DASHBOARD

		[HttpPost]
		[Route("AddResource")]
		public JsonResult AddResource([FromForm] string resourceTitle, [FromForm] int UploaderID, [FromForm] string descp, 
			[FromForm] string link, [FromForm] string course, [FromForm] string filetype)
		{
			string query = "INSERT INTO resources (resourceTitle, UploaderID, UploadDate, likes, " +
				"dislikes, descp, status, link, course, filetype) VALUES" +
				"(@resourceTitle, @UploaderID, @date, 0, 0, @descp, 'pending', @link, @course, @filetype)";

			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					mycmd.Parameters.AddWithValue("@resourceTitle", resourceTitle);
					mycmd.Parameters.AddWithValue("@UploaderID", UploaderID);
					mycmd.Parameters.AddWithValue("@date", DateTime.Now);
					mycmd.Parameters.AddWithValue("@descp", descp);
					mycmd.Parameters.AddWithValue("@link", link);
					mycmd.Parameters.AddWithValue("@course", course);
					mycmd.Parameters.AddWithValue("@filetype", filetype);
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult("Resource Uploaded Successfully");
		}

		[HttpGet]
		[Route("GetResources")]
		public JsonResult GetResources()
		{
			string query = "SELECT r.ID, resourceTitle, UploadDate, likes, dislikes, descp, link, s.name, course, filetype" +
				" FROM resources r JOIN users s ON r.UploaderID = s.id" +
				" WHERE r.status = 'approved' OR r.status = 'reported'";
			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn)) 
				{ 
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult(table);
		}

		[HttpGet]
		[Route("GetSpecificResources")]
		public JsonResult GetSpecificResources(string field, string condition)
		{
			string query = "SELECT r.ID, resourceTitle, UploadDate, likes, dislikes, descp, link, s.name, course, filetype" +
				" FROM resources r JOIN users s ON r.UploaderID = s.id" +
				" WHERE " + field + " LIKE '%"+condition+"%'";
			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult(table);
		}

		[HttpGet]
		[Route("SearchSpecificResources")]
		public JsonResult SearchSpecificResources(string field, string condition)
		{
			string query = "SELECT r.ID, resourceTitle, UploadDate, likes, dislikes, descp, link, s.name, course, filetype" +
				" FROM resources r JOIN users s ON r.UploaderID = s.id" +
				" WHERE (r.status = 'approved' OR r.status = 'reported') AND " + field + " LIKE '%" + condition + "%'";
			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult(table);
		}

		[HttpGet]
		[Route("GetResourceComments")]
		public JsonResult GetResourceComments(int resrcID)
		{
			string query = "SELECT c.ID, comment, commentdate, name FROM resourceComments c " +
				"JOIN users s ON c.commentorID = s.id " +
				"WHERE c.resourceID = @resrcID";

			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					mycmd.Parameters.AddWithValue("@resrcID", resrcID);
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult(table);
		}

		[HttpPost]
		[Route("AddResourceComment")]
		public JsonResult AddResourceComment([FromForm] string comment, [FromForm] int resourceID, [FromForm] int commentorID)
		{
			string query = "INSERT INTO resourceComments (resourceID, comment, commentdate, commentorID) VALUES " +
				"(@resourceID, @comment, @commentdate, @commentorID);";
			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			try
			{
				using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
				{
					myconn.Open();
					using (SqlCommand mycmd = new SqlCommand(query, myconn))
					{
						mycmd.Parameters.AddWithValue("@comment", comment);
						mycmd.Parameters.AddWithValue("@resourceID", resourceID);
						mycmd.Parameters.AddWithValue("@commentorID", commentorID);
						mycmd.Parameters.AddWithValue("@commentdate", DateTime.Now);

						myreader = mycmd.ExecuteReader();
						table.Load(myreader);
						myreader.Close();
						myconn.Close();
					}
				}
				return new JsonResult("Commented Successfully");
			}
			catch (Exception ex)
			{
				return new JsonResult(ex);
			}
			}

		[HttpPost]
		[Route("ReportResource")]
		public JsonResult ReportResource([FromForm] int resourceID)
		{
			string query = "UPDATE resources SET status = 'reported' WHERE ID = @resourceID;";
			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					mycmd.Parameters.AddWithValue("@resourceID", resourceID);
	
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult("Reported Successfully");
		}

		//--------------- CHATROOMS

		[HttpGet]
		[Route("GetChatrooms")]
		public JsonResult GetChatrooms()
		{
			string query = "SELECT * FROM chatrooms";
			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult(table);
		}

		[HttpGet]
		[Route("GetchatroomMsgs")]
		public JsonResult GetchatroomMsgs(int roomID)
		{
			string query = "SELECT * FROM chatroomComments cc " +
				"JOIN chatrooms c ON cc.roomID = c.ID " +
				"JOIN users u ON cc.personID = u.id " +
				"WHERE roomID = @roomID";
			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					mycmd.Parameters.AddWithValue("@roomID", roomID);
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult(table);
		}

		[HttpPost]
		[Route("AddChatmsg")]
		public JsonResult AddChatmsg([FromForm] string msg, [FromForm] int roomID, [FromForm] int personID)
		{
			string query = "INSERT INTO chatroomComments (roomID, chat, msgTime, personID) VALUES " +
				"(@roomID, @msg, @date, @personID);";
			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					mycmd.Parameters.AddWithValue("@msg", msg);
					mycmd.Parameters.AddWithValue("@roomID", roomID);
					mycmd.Parameters.AddWithValue("@personID", personID);
					mycmd.Parameters.AddWithValue("@date", DateTime.Now);

					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}			
			return new JsonResult("Msg Added Successfully");
		}

		//--------------- Bookmarks
		[HttpGet]
		[Route("GetBookMarkedResources")]
		public JsonResult GetBookMarkedResources(int userID)
		{
			string query = "SELECT ID, resourceTitle, link, course, filetype" +
				" FROM resources JOIN userBookmarks on resID = ID" +
				" WHERE stID = " + userID;

			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult(table);
		}

		[HttpPost]
		[Route("RemoveBookmark")]
		public JsonResult RemoveBookmark([FromForm] int userID, [FromForm] int resID)
		{
			string query = "DELETE FROM userBookmarks WHERE resID = @resID AND stID = @userID";
			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					mycmd.Parameters.AddWithValue("@resID", resID);
					mycmd.Parameters.AddWithValue("@userID", userID);
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult("Bookmark removed");
		}
		[HttpPost]
		[Route("AddBookmark")]
		public JsonResult AddBookmark([FromForm] int userID, [FromForm] int resID)
		{
			string query = "INSERT INTO userBookmarks (resID, stID) " +
				"SELECT newResID, newStID FROM (" +
				"VALUES (@resID, @userID)" +
				") AS newValues (newResID, newStID)" +
				"WHERE NOT EXISTS (" +
				"SELECT 1 FROM userBookmarks" +
				" WHERE resID = newResID AND stID = newStID);";

			DataTable table = new DataTable();
			string sqlDataRoute = _configuration.GetConnectionString("ResourceHQCon");
			SqlDataReader myreader;
			using (SqlConnection myconn = new SqlConnection(sqlDataRoute))
			{
				myconn.Open();
				using (SqlCommand mycmd = new SqlCommand(query, myconn))
				{
					mycmd.Parameters.AddWithValue("@resID", resID);
					mycmd.Parameters.AddWithValue("@userID", userID);
					myreader = mycmd.ExecuteReader();
					table.Load(myreader);
					myreader.Close();
					myconn.Close();
				}
			}
			return new JsonResult("Bookmark Added");
		}
	}
}

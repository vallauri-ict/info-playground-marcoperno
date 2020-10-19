using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Progetto2.App_Code;
using ServiceStack.Text;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.Stripe;
using ServiceStack.Stripe.Types;

namespace Progetto2
{
    public partial class _default : System.Web.UI.Page
    {
        TestsBase testsBase = new TestsBase();
        protected void Page_Load(object sender, EventArgs e)
        {
            
            if (!Page.IsPostBack)
            {
                var customer = testsBase.CreateCustomer();

                customer.PrintDump();

                var newCustomer = testsBase.gateway.Get(new GetStripeCustomer { Id = customer.Id });

                var charge = testsBase.gateway.Post(new ChargeStripeCustomer
                {
                    Amount = 100,
                    Customer = customer.Id,
                    Currency = "usd",
                    Description = "Test Charge Customer",
                    
                });
                var card = testsBase.gateway.Post(new CreateStripeCard
                {
                    CustomerId = customer.Id,
                    Card = new StripeCard
                    {
                        Name = "Test Card 2",
                        Number = "5555555555554444",
                        Cvc = "456",
                        ExpMonth = 1,
                        ExpYear = 2025
                    },
                });
                var stripeToken = new CreateStripeCard(customer.Id, card);
            }
        }
    }
}
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
using Stripe;

namespace Progetto2
{
    public partial class _default : System.Web.UI.Page
    {
        TestsBase testsBase = new TestsBase();
        protected void Page_Load(object sender, EventArgs e)
        {
            
            if (!Page.IsPostBack)
            {
                //var customer = testsBase.CreateCustomer();

                //customer.PrintDump();

                /*var newCustomer = testsBase.gateway.Get(new GetStripeCustomer { Id = customer.Id });

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
                });*/
                /*var stripeToken = new CreateStripeCard();
                stripeToken.CustomerId = customer.Id;
                stripeToken.Card = card;*/
               


            }
        }

        protected async void btn_Click(object sender, EventArgs e)
        {
            await ProvaPagamento();
        }

        private async Task ProvaPagamento()
        {
            StripeConfiguration.ApiKey = "sk_test_51HdBEvBEkathEg4GNet2fc7AdTxQChEceZOq6I0rxH3vA7ek8MLcCMO1IqQlwMkvjtIV5qYzqEJSHdsX1fdQ5WVD00Arjhr75M";

            var optionstoken = new TokenCreateOptions
            {
                Card = new TokenCardOptions
                {
                    Number = "4242424242424242",
                    ExpMonth = 10,
                    ExpYear = 2021,
                    Cvc = "314",
                },
            };

            var serviceToken = new TokenService();

            Token stripetoken = await serviceToken.CreateAsync(optionstoken);

            var options = new ChargeCreateOptions
            {
                Amount = 5000,
                Currency = "usd",
                Description = "test",
                Source = stripetoken.Id

            };

            var service = new ChargeService();
            Charge charge = await service.CreateAsync(options);

            if (charge.Paid)
            {
                txt.Text = "ok";
            }
        }
    }
}
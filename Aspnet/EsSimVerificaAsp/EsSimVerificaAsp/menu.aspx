<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="menu.aspx.cs" Inherits="EsSimVerificaAsp.menu" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
     <script type="text/javascript">
        function textValidation(source, arguments) {
            if (arguments.Value.length >= 2)
                arguments.IsValid = true;
            else
                arguments.IsValid = false;
        }
     </script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:GridView Id="dgv" runat="server"  AutoGenerateColumns="False"  DataKeyNames="IdCorso" OnRowCommand="dgv_RowCommand" OnSelectedIndexChanged="dgv_SelectedIndexChanged" >
               <Columns>
                    <asp:BoundField DataField="IdCorso" HeaderText="IdCorso" Visible="False" />
                    <asp:BoundField DataField="Corso" HeaderText="Corso" />
                    <asp:ButtonField ButtonType="Button" CommandName="btnScegliCorso" HeaderText="Seleziona Corso" Text="Prenota" />
                </Columns>
            </asp:GridView>

            <div id="divPrenota" visible ="false" runat="server">
                <asp:Label ID="lblIdLibro" runat="server" Text="Id libro: "></asp:Label>
                <br />
                <asp:Label ID="lblEmail" runat="server" Text="Email: "></asp:Label>
                <asp:TextBox ID="txtEmail" runat="server"></asp:TextBox>
                <asp:RegularExpressionValidator ID="checkEmail" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" runat="server" ControlToValidate="txtEmail" Display="Dynamic"  ErrorMessage="Email non corretta"></asp:RegularExpressionValidator>
                <asp:CustomValidator ID="CustValMail" runat="server" ErrorMessage="Email non valida" ControlToValidate="txtEmail" Display="Dynamic" OnServerValidate="CustValMail_ServerValidate" ForeColor="Red"></asp:CustomValidator>
                <asp:Label ID="lblPassword" runat="server" Text="Password: "></asp:Label>
                <asp:TextBox TextMode="Password" ID="pwd" runat="server"></asp:TextBox>
                <asp:CustomValidator ID="custmoPwd" runat="server" ControlToValidate="pwd" ErrorMessage="Pwd lunga almeno 2 caratetteri" OnServerValidate="custmoPwd_ServerValidate"  ClientValidationFunction="textValidation" ></asp:CustomValidator>
                <asp:RequiredFieldValidator ID="RequiredFieldValidatorPWD" runat="server" ErrorMessage="Password obbligatoria" ControlToValidate="pwd" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
                <asp:Button ID="btnPretona" runat="server" Text="Button" OnClick="btnPretona_Click" />
            </div>
            <br />
            <asp:DropDownList ID="cmbCorsi" runat="server" OnSelectedIndexChanged="cmbCorsi_SelectedIndexChanged"></asp:DropDownList>
            <asp:GridView ID="dgvIscrittiCorso"  AutoGenerateColumns="False" runat="server">
                <Columns>
                    <asp:BoundField DataField="idCliente" HeaderText="clienti" />
                </Columns>
            </asp:GridView>
        </div>
    </form>
</body>
</html>

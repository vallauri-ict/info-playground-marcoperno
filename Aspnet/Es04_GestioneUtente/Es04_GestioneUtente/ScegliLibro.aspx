<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ScegliLibro.aspx.cs" Inherits="Es04_GestioneUtente.ScegliLibro" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:GridView ID="dgvLibri" runat="server" AutoGenerateColumns="False" DataKeyNames="idLibro" OnRowCommand="dgvLibri_RowCommand">
                <Columns>
                    <asp:BoundField DataField="idLibro" HeaderText="Codice Libro" Visible="False" />
                    <asp:BoundField DataField="titolo" HeaderText="Titolo Libro" />
                    <asp:BoundField DataField="autore" HeaderText="Autore" />
                    <asp:BoundField DataField="anno" HeaderText="Anno Pubblicazione" />
                    <asp:ButtonField ButtonType="Button" CommandName="btnPrenota" HeaderText="Prenota Libro" Text="Prenota" />
                </Columns>
            </asp:GridView>
            <br />
            <br />
            <asp:Label ID="lblMessaggio" runat="server" Text=""></asp:Label>
        </div>
    </form>
</body>
</html>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="menu.aspx.cs" Inherits="Es04_GestioneUtente.menu" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:HyperLink ID="hlDettaglioUtente" runat="server" NavigateUrl="dettaglioUtente.aspx">Dettaglio Utente</asp:HyperLink>
            <br />
            <asp:HyperLink ID="hlScegliLibro" runat="server" NavigateUrl="ScegliLibro.aspx">Scegli Libro</asp:HyperLink>
        </div>
    </form>
</body>
</html>

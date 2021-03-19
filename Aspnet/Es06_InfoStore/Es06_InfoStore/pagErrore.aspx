<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="pagErrore.aspx.cs" Inherits="Es06_InfoStore.pagErrore" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphNavBar" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphBody" runat="server">
    <div class="form-signin">
        <h1>Errore!</h1>
        <br />
        <br />
        <h3>
            <asp:Label ID="lblMsg" runat="server" Text=""></asp:Label>
        </h3>
        <br />
        <br />
        <asp:Button ID="btnIndietro" runat="server" Text="Vai a Login" CssClass="btn btn-lg btn-primary btn-block" OnClick="btnIndietro_Click" />
    </div>
</asp:Content>

﻿<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="confermaOrdine.aspx.cs" Inherits="Es06_InfoStore.confermaOrdine" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphNavBar" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphBody" runat="server">
    <h1>Ordine Confermato</h1>
    <br />
    <asp:Button ID="btnvisPDF" class="btn btn-success btn-block" runat="server" Text="Visualizza Fattura" OnClick="btnvisPDF_Click"/>
</asp:Content>

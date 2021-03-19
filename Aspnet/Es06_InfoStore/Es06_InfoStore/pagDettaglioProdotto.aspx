<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="pagDettaglioProdotto.aspx.cs" Inherits="Es06_InfoStore.pagDettaglioProdotto" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphNavBar" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphBody" runat="server">
    <asp:GridView ID="dgv" CssClass="table table-striped table-bordered" runat="server" AutoGenerateColumns="False" DataKeyNames="idProdotto">
        <Columns>
            <asp:BoundField DataField="idProdotto" HeaderText="id" Visible="false" />
            <asp:BoundField DataField="Marca" HeaderText="Marca" />
            <asp:BoundField DataField="Prezzo" HeaderText="Prezzo" />
            <asp:BoundField DataField="Nome" HeaderText="Nome" />
            <asp:BoundField DataField="Descrizione" HeaderText="Descrizione" />
            <asp:BoundField DataField="Qta" HeaderText="Quantità" />
        </Columns>
    </asp:GridView>
    <br />
    <div class="row">
        <div class="col-sm-4 form-inline">
            <label for="txtQta">Quantità:</label>
            <asp:TextBox ID="txtQta" CssClass="form-control" runat="server"></asp:TextBox>
        </div>
        <div class="col-sm-4">
            <asp:Button ID="btnCarrello" CssClass="btn btn-lg btn-primary btn-block" runat="server" Text="Aggiungi al Carrello" OnClick="btnCarrello_Click" />
        </div>
        <div class="col-sm-4">
            <asp:Button ID="btnAnnulla" CssClass="btn btn-lg btn-warning btn-block" runat="server" Text="Annulla" OnClick="btnAnnulla_Click" />
        </div>
    </div>
    <br />
    <asp:Panel ID="divMsg" class="alert alert-warning" runat="server">
        <strong>ATTENZIONE!</strong> Quantità insufficiente.
    </asp:Panel>
</asp:Content>

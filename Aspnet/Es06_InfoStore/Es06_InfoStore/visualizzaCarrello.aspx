<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="visualizzaCarrello.aspx.cs" Inherits="Es06_InfoStore.visualizzaCarrello" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphNavBar" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphBody" runat="server">
    <asp:Panel ID="divDGV" runat="server">
        <asp:GridView ID="dgv" CssClass="table table-striped table-bordered" runat="server" AutoGenerateColumns="False" OnRowCommand="dgv_RowCommand" DataKeyNames="idProdotto">
            <Columns>
                <asp:BoundField DataField="idProdotto" HeaderText="id" Visible="false" />
                <asp:BoundField DataField="Nome" HeaderText="Nome" />
                <asp:BoundField DataField="Prezzo" HeaderText="Prezzo" />
                <asp:BoundField DataField="Qta" HeaderText="Quantita" />
                <asp:ButtonField ButtonType="Button" CommandName="elimina" Text="Elimina" HeaderText="Elimina" ControlStyle-CssClass="btn btn-warning">
                    <ControlStyle CssClass="btn btn-warning"></ControlStyle>
                </asp:ButtonField>
            </Columns>
        </asp:GridView>
        <asp:DropDownList ID="cmbMetodoPagamento" CssClass="form-control" runat="server"></asp:DropDownList>

        <br />
        <asp:Button ID="btnConferma" class="btn btn-success btn-block" runat="server" Text="Conferma" OnClick="btnConferma_Click" />
    </asp:Panel>
    <br />
    <asp:Panel ID="divMsg" class="alert alert-warning" runat="server">
        <strong>ATTENZIONE!</strong> Carrello vuoto.
    </asp:Panel>
</asp:Content>

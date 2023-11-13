using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ProjectC.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustCompany",
                columns: table => new
                {
                    CustCompany_ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CustCompany_Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustCompany", x => x.CustCompany_ID);
                });

            migrationBuilder.CreateTable(
                name: "Department",
                columns: table => new
                {
                    Department_ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Department_Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Department", x => x.Department_ID);
                });

            migrationBuilder.CreateTable(
                name: "TypeAccounts",
                columns: table => new
                {
                    Type_ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type_Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeAccounts", x => x.Type_ID);
                });

            migrationBuilder.CreateTable(
                name: "Machines",
                columns: table => new
                {
                    Machine_ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Machine_Name = table.Column<string>(type: "text", nullable: false),
                    CustCompany_ID = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Machines", x => x.Machine_ID);
                    table.ForeignKey(
                        name: "FK_Machines_CustCompany_CustCompany_ID",
                        column: x => x.CustCompany_ID,
                        principalTable: "CustCompany",
                        principalColumn: "CustCompany_ID");
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Account_ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Account_Name = table.Column<string>(type: "text", nullable: false),
                    Account_Password = table.Column<string>(type: "text", nullable: false),
                    Account_Email = table.Column<string>(type: "text", nullable: true),
                    Account_Phone = table.Column<string>(type: "text", nullable: true),
                    DepartmentID = table.Column<int>(type: "integer", nullable: true),
                    CustCompanyID = table.Column<int>(type: "integer", nullable: true),
                    TypeAccountID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Account_ID);
                    table.ForeignKey(
                        name: "FK_Accounts_CustCompany_CustCompanyID",
                        column: x => x.CustCompanyID,
                        principalTable: "CustCompany",
                        principalColumn: "CustCompany_ID");
                    table.ForeignKey(
                        name: "FK_Accounts_Department_DepartmentID",
                        column: x => x.DepartmentID,
                        principalTable: "Department",
                        principalColumn: "Department_ID");
                    table.ForeignKey(
                        name: "FK_Accounts_TypeAccounts_TypeAccountID",
                        column: x => x.TypeAccountID,
                        principalTable: "TypeAccounts",
                        principalColumn: "Type_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Ticket_ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Ticket_Name = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<bool>(type: "boolean", nullable: false),
                    Ticket_Message = table.Column<string>(type: "text", nullable: false),
                    Ticket_Photo = table.Column<string>(type: "text", nullable: false),
                    AccountCustomerID = table.Column<int>(type: "integer", nullable: false),
                    MachineID = table.Column<int>(type: "integer", nullable: false),
                    AccountVisconID = table.Column<int>(type: "integer", nullable: false),
                    Ticket_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Ticket_ID);
                    table.ForeignKey(
                        name: "FK_Tickets_Accounts_AccountCustomerID",
                        column: x => x.AccountCustomerID,
                        principalTable: "Accounts",
                        principalColumn: "Account_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Accounts_AccountVisconID",
                        column: x => x.AccountVisconID,
                        principalTable: "Accounts",
                        principalColumn: "Account_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Machines_MachineID",
                        column: x => x.MachineID,
                        principalTable: "Machines",
                        principalColumn: "Machine_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_CustCompanyID",
                table: "Accounts",
                column: "CustCompanyID");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_DepartmentID",
                table: "Accounts",
                column: "DepartmentID");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_TypeAccountID",
                table: "Accounts",
                column: "TypeAccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Machines_CustCompany_ID",
                table: "Machines",
                column: "CustCompany_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_AccountCustomerID",
                table: "Tickets",
                column: "AccountCustomerID");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_AccountVisconID",
                table: "Tickets",
                column: "AccountVisconID");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_MachineID",
                table: "Tickets",
                column: "MachineID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Machines");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropTable(
                name: "TypeAccounts");

            migrationBuilder.DropTable(
                name: "CustCompany");
        }
    }
}

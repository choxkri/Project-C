using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ProjectC.Migrations
{
    /// <inheritdoc />
    public partial class test1231214 : Migration
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
                name: "AccountCustomers",
                columns: table => new
                {
                    AccountCustomer_ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AccountCustomer_Name = table.Column<string>(type: "text", nullable: false),
                    AccountCustomer_Password = table.Column<string>(type: "text", nullable: false),
                    AccountCustomer_Email = table.Column<string>(type: "text", nullable: true),
                    AccountCustomer_Phone = table.Column<string>(type: "text", nullable: true),
                    CustCompany_ID = table.Column<int>(type: "integer", nullable: false),
                    TypeAccountID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountCustomers", x => x.AccountCustomer_ID);
                    table.ForeignKey(
                        name: "FK_AccountCustomers_CustCompany_CustCompany_ID",
                        column: x => x.CustCompany_ID,
                        principalTable: "CustCompany",
                        principalColumn: "CustCompany_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccountCustomers_TypeAccounts_TypeAccountID",
                        column: x => x.TypeAccountID,
                        principalTable: "TypeAccounts",
                        principalColumn: "Type_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AccountViscon",
                columns: table => new
                {
                    AccountViscon_ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AccountViscon_Name = table.Column<string>(type: "text", nullable: false),
                    AccountViscon_Password = table.Column<string>(type: "text", nullable: false),
                    AccountViscon_Email = table.Column<string>(type: "text", nullable: true),
                    AccountViscon_Phone = table.Column<string>(type: "text", nullable: true),
                    DepartmentID = table.Column<int>(type: "integer", nullable: false),
                    TypeAccountID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountViscon", x => x.AccountViscon_ID);
                    table.ForeignKey(
                        name: "FK_AccountViscon_Department_DepartmentID",
                        column: x => x.DepartmentID,
                        principalTable: "Department",
                        principalColumn: "Department_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccountViscon_TypeAccounts_TypeAccountID",
                        column: x => x.TypeAccountID,
                        principalTable: "TypeAccounts",
                        principalColumn: "Type_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Machines",
                columns: table => new
                {
                    Machine_ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Machine_Name = table.Column<string>(type: "text", nullable: false),
                    AccountCustomer_ID = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Machines", x => x.Machine_ID);
                    table.ForeignKey(
                        name: "FK_Machines_AccountCustomers_AccountCustomer_ID",
                        column: x => x.AccountCustomer_ID,
                        principalTable: "AccountCustomers",
                        principalColumn: "AccountCustomer_ID");
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Ticket_ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Ticket_Name = table.Column<string>(type: "text", nullable: false),
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
                        name: "FK_Tickets_AccountCustomers_AccountCustomerID",
                        column: x => x.AccountCustomerID,
                        principalTable: "AccountCustomers",
                        principalColumn: "AccountCustomer_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_AccountViscon_AccountVisconID",
                        column: x => x.AccountVisconID,
                        principalTable: "AccountViscon",
                        principalColumn: "AccountViscon_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Machines_MachineID",
                        column: x => x.MachineID,
                        principalTable: "Machines",
                        principalColumn: "Machine_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountCustomers_CustCompany_ID",
                table: "AccountCustomers",
                column: "CustCompany_ID");

            migrationBuilder.CreateIndex(
                name: "IX_AccountCustomers_TypeAccountID",
                table: "AccountCustomers",
                column: "TypeAccountID");

            migrationBuilder.CreateIndex(
                name: "IX_AccountViscon_DepartmentID",
                table: "AccountViscon",
                column: "DepartmentID");

            migrationBuilder.CreateIndex(
                name: "IX_AccountViscon_TypeAccountID",
                table: "AccountViscon",
                column: "TypeAccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Machines_AccountCustomer_ID",
                table: "Machines",
                column: "AccountCustomer_ID");

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
                name: "AccountViscon");

            migrationBuilder.DropTable(
                name: "Machines");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropTable(
                name: "AccountCustomers");

            migrationBuilder.DropTable(
                name: "CustCompany");

            migrationBuilder.DropTable(
                name: "TypeAccounts");
        }
    }
}

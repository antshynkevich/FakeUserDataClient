using Bogus;
using FakeUserDataClient.Server.Models;

namespace FakeUserDataClient.Server.Services;

public interface IDataGenerator
{
    FakeUser[] GetData(int page, int errors);
    public Faker<FakeUser> FakePersonGenerator { get; set; }
    public Faker Faker { get; set; }
}

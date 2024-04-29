using Bogus;
using FakeUserDataClient.Server.Models;

namespace FakeUserDataClient.Server.Services;

public class DataGeneratorFactory : IDataGeneratorFactory
{
    public IDataGenerator ConfigureGenerator(int page, string region, int seed)
    {
        Randomizer.Seed = new Random(seed + (page - 1));

        IDataGenerator dataGenerator = new DataGenerator();
        var fakePersonGenerator = new Faker<FakeUser>(region)
            .RuleFor(u => u.Id, f => f.Random.Guid())
            .RuleFor(u => u.FullName, f => f.Name.FullName())
            .RuleFor(u => u.Phone, f => f.Phone.PhoneNumber())
            .RuleFor(u => u.StreetAddress, f => 
            $"{(f.Address.State() + ", ").OrNull(f, .5f)}" +
            $"{f.Address.City()}, " +
            $"{f.Address.StreetAddress()}" +
            $"{(", " + f.Address.SecondaryAddress()).OrNull(f, .3f)}" +
            $"{(", " + f.Address.ZipCode()).OrNull(f, .6f)}");

        dataGenerator.FakePersonGenerator = fakePersonGenerator;
        dataGenerator.Faker  = new Faker(region);
        return dataGenerator;
    }
}
